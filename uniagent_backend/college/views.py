from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile, Student, Faculty

class SignupView(APIView):
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role', 'Student')

        if not name or not email or not password:
            return Response({'error': 'Please provide name, email, and password.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=email).exists():
            return Response({'error': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Create secure Django User
        user = User.objects.create_user(username=email, email=email, password=password)
        
        # 2. Link Profile
        profile = UserProfile.objects.create(user=user, role=role)

        # 3. Create placeholder Student or Faculty if needed
        if role == 'Student':
            student = Student.objects.create(
                name=name, 
                email=email, 
                roll_no=email.split('@')[0].upper(), # temp auto Gen
                department='CSE', # default until edited
                year=1
            )
            profile.student_profile = student
            profile.save()
        elif role == 'Faculty':
            faculty = Faculty.objects.create(
                name=name,
                email=email,
                department='CSE'
            )
            profile.faculty_profile = faculty
            profile.save()

        # Send back response
        return Response({
            'message': 'Signup successful',
            'user': {
                'name': name,
                'email': email,
                'role': role
            }
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)
        
        if user is not None:
            # Login successful
            try:
                role = user.profile.role
                name = user.profile.student_profile.name if user.profile.student_profile else \
                       (user.profile.faculty_profile.name if user.profile.faculty_profile else user.username)
            except UserProfile.DoesNotExist:
                role = 'Student'
                name = user.username
                
            return Response({
                'message': 'Login successful',
                'user': {
                    'name': name,
                    'email': user.email,
                    'role': role
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)
