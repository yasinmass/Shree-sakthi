def get_courses(dept=None, semester=None, **kwargs):
    """
    List courses filtered by optional department and/or semester.
    """
    from college.models import Course
    
    qs = Course.objects.select_related('faculty').all()
    
    dept_val = dept if dept is not None else kwargs.get('department')
    if dept_val:
        qs = qs.filter(department__iexact=dept_val)
        
    if semester:
        qs = qs.filter(semester=int(semester))

    return [
        {
            "id":         c.id,
            "name":       c.name,
            "department": c.department,
            "semester":   c.semester,
            "credits":    c.credits,
            "faculty":    c.faculty.name if c.faculty else "Unassigned",
        }
        for c in qs
    ]


def create_course(name=None, dept=None, semester=None, credits=3, **kwargs):
    """
    Create a new course. Returns the created course dict.
    """
    from college.models import Course
    
    dept = dept or kwargs.get('department')
    
    if Course.objects.filter(name__iexact=name, department__iexact=dept, semester=int(semester)).exists():
        return {"error": f"Course '{name}' for {dept} Sem {semester} already exists."}

    course = Course.objects.create(
        name=name,
        department=dept.upper(),
        semester=int(semester),
        credits=int(credits),
    )
    return {
        "status":     "created",
        "id":         course.id,
        "name":       course.name,
        "department": course.department,
        "semester":   course.semester,
        "credits":    course.credits,
    }
