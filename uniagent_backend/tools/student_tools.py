def get_students(dept=None, year=None, gpa_above=None, min_gpa=None, **kwargs):
    """
    Fetch students filtered by optional department, year, and minimum GPA.
    Returns a list of student dicts.
    """
    from college.models import Student
    
    qs = Student.objects.all()
    
    dept_val = dept if dept is not None else kwargs.get('department')
    if dept_val:
        qs = qs.filter(department__iexact=dept_val)
        
    if year:
        qs = qs.filter(year=int(year))
        
    gpa_val = gpa_above if gpa_above is not None else min_gpa
    if gpa_val is not None:
        qs = qs.filter(gpa__gte=float(gpa_val))

    return [
        {
            "roll_no":    s.roll_no,
            "name":       s.name,
            "department": s.department,
            "year":       s.year,
            "gpa":        float(s.gpa),
            "email":      s.email,
        }
        for s in qs
    ]


def enroll_student(name=None, dept=None, year=None, email=None, roll_no=None, **kwargs):
    """
    Enroll a new student. roll_no is auto-generated if not provided.
    Returns the created student dict.
    """
    from college.models import Student
    
    dept = dept or kwargs.get('department')
    if not dept:
        return {"error": "Department code is required."}
        
    if not roll_no:
        # Auto-generate: dept + highest existing roll number + 1
        last = Student.objects.filter(department__iexact=dept).order_by('-roll_no').first()
        if last:
            try:
                num = int(last.roll_no.replace(dept.upper(), '')) + 1
            except ValueError:
                num = 1
        else:
            num = 1
        roll_no = f"{dept.upper()}{num:04d}"

    student = Student.objects.create(
        name=name,
        roll_no=roll_no,
        department=dept.upper(),
        year=int(year),
        email=email,
    )
    return {
        "status":  "enrolled",
        "roll_no": student.roll_no,
        "name":    student.name,
        "dept":    student.department,
        "year":    student.year,
        "email":   student.email,
    }


def update_student(roll_no=None, field=None, value=None, **kwargs):
    """
    Update a single field of a student record.
    Allowed fields: name, department, year, gpa, email
    """
    from college.models import Student
    
    allowed = {'name', 'department', 'year', 'gpa', 'email'}
    if field not in allowed:
        return {"error": f"Field '{field}' is not updatable. Allowed: {allowed}"}

    try:
        student = Student.objects.get(roll_no=roll_no)
    except Student.DoesNotExist:
        return {"error": f"No student found with roll_no={roll_no}"}

    if field == 'year':
        value = int(value)
    if field == 'gpa':
        value = float(value)

    setattr(student, field, value)
    student.save()
    return {"status": "updated", "roll_no": roll_no, "field": field, "new_value": value}


def delete_student(roll_no=None, **kwargs):
    """
    Delete a student by roll_no.
    """
    from college.models import Student
    
    try:
        student = Student.objects.get(roll_no=roll_no)
        name = student.name
        student.delete()
        return {"status": "deleted", "roll_no": roll_no, "name": name}
    except Student.DoesNotExist:
        return {"error": f"No student found with roll_no={roll_no}"}
