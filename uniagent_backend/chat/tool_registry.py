"""
chat/tool_registry.py
"""

# Type constants
STRING  = "STRING"
NUMBER  = "NUMBER"
INTEGER = "INTEGER"
BOOLEAN = "BOOLEAN"

def _fn(name: str, description: str, properties: dict, required: list = None):
    return {
        "name": name,
        "description": description,
        "parameters": {
            "type": "OBJECT",
            "properties": {
                k: {"type": v[0], "description": v[1]}
                for k, v in properties.items()
            },
            "required": required or [],
        }
    }

STUDENT_TOOLS_DECLS = [
    _fn("get_students",
        "Retrieve a list of students filtered by department, year, or minimum GPA.",
        {
            "dept":      (STRING,  "Department code, e.g. CSE, ECE, MECH, IT. Leave empty for all."),
            "year":      (INTEGER, "Year of study: 1, 2, 3, or 4. Leave empty for all."),
            "gpa_above": (NUMBER,  "Minimum GPA threshold (e.g. 8.0). Leave empty for all."),
        }),
    _fn("enroll_student",
        "Enroll a new student into the university.",
        {
            "name":  (STRING,  "Full name of the student"),
            "dept":  (STRING,  "Department code: CSE, ECE, MECH, IT"),
            "year":  (INTEGER, "Year of study: 1, 2, 3, or 4"),
            "email": (STRING,  "Student email address"),
        },
        required=["name", "dept", "year", "email"]),
    _fn("update_student",
        "Update a single field of an existing student record.",
        {
            "roll_no": (STRING, "Student roll number"),
            "field":   (STRING, "Field to update: name, department, year, gpa, or email"),
            "value":   (STRING, "New value for the field"),
        },
        required=["roll_no", "field", "value"]),
    _fn("delete_student",
        "Permanently delete a student record by roll number.",
        {
            "roll_no": (STRING, "Student roll number to delete"),
        },
        required=["roll_no"]),
]

FACULTY_TOOLS_DECLS = [
    _fn("get_faculty",
        "List faculty members",
        {
            "dept": (STRING, "Department code, e.g. CSE. Leave empty for all."),
        }),
    _fn("add_faculty",
        "Add a new faculty member",
        {
            "name":  (STRING, "Full name of the faculty"),
            "dept":  (STRING, "Department code"),
            "email": (STRING, "Faculty email address"),
        },
        required=["name", "dept", "email"]),
    _fn("assign_subject",
        "Assign an existing course to a faculty member",
        {
            "faculty_name": (STRING, "Full name of the faculty member"),
            "subject":      (STRING, "Name of the course to assign"),
        },
        required=["faculty_name", "subject"]),
    _fn("get_workload", "Get the number of courses assigned to each faculty member.", {}),
]

ATTENDANCE_TOOLS_DECLS = [
    _fn("get_low_attendance",
        "Find students with attendance below a threshold",
        {
            "threshold": (NUMBER, "Minimum percentage (default 75)."),
            "dept":      (STRING, "Optional department filter."),
        }),
    _fn("mark_attendance",
        "Mark today's attendance for a student.",
        {
            "roll_no":   (STRING,  "Student roll number"),
            "course_id": (INTEGER, "Course ID"),
            "status":    (STRING,  "P, A, or L"),
        },
        required=["roll_no", "course_id"]),
    _fn("get_student_attendance",
        "Get attendance records for a specific student.",
        {
            "roll_no": (STRING,  "Student roll number"),
            "month":   (INTEGER, "Month number 1-12"),
        },
        required=["roll_no"]),
]

EXAM_TOOLS_DECLS = [
    _fn("get_top_students",
        "Get the top-performing students in a given subject",
        {
            "subject": (STRING,  "Course/subject name"),
            "limit":   (INTEGER, "Number of top students to return"),
        },
        required=["subject"]),
    _fn("record_marks",
        "Record exam marks",
        {
            "roll_no":   (STRING,  "Student roll number"),
            "subject":   (STRING,  "Course/subject name"),
            "marks":     (NUMBER,  "Marks obtained"),
            "exam_type": (STRING,  "MID1, MID2, FINAL, or LAB"),
            "max_marks": (NUMBER,  "Maximum possible marks"),
        },
        required=["roll_no", "subject", "marks"]),
    _fn("schedule_exam",
        "Schedule an exam",
        {
            "subject":   (STRING,  "Course name"),
            "semester":  (INTEGER, "Semester number"),
            "exam_date": (STRING,  "YYYY-MM-DD"),
            "exam_type": (STRING,  "MID1, MID2, FINAL, or LAB"),
        },
        required=["subject", "semester", "exam_date"]),
]

COURSE_TOOLS_DECLS = [
    _fn("get_courses",
        "List all courses",
        {
            "dept":     (STRING,  "Department code"),
            "semester": (INTEGER, "Semester number"),
        }),
    _fn("create_course",
        "Create a new course",
        {
            "name":     (STRING,  "Course name"),
            "dept":     (STRING,  "Department code"),
            "semester": (INTEGER, "Semester number"),
            "credits":  (INTEGER, "Number of credits"),
        },
        required=["name", "dept", "semester"]),
]

ANALYTICS_TOOLS_DECLS = [
    _fn("get_pass_stats",
        "Get pass/fail stats",
        {"dept": (STRING, "Optional department")}),
    _fn("get_dept_performance",
        "Get average GPA and marks per department",
        {}),
    _fn("get_enrollment_trends",
        "Get enrollment counts by year and department",
        {}),
]

TOOL_DECLARATIONS = {
    "student":    STUDENT_TOOLS_DECLS,
    "faculty":    FACULTY_TOOLS_DECLS,
    "attendance": ATTENDANCE_TOOLS_DECLS,
    "exam":       EXAM_TOOLS_DECLS,
    "course":     COURSE_TOOLS_DECLS,
    "analytics":  ANALYTICS_TOOLS_DECLS,
}

from tools.student_tools    import get_students, enroll_student, update_student, delete_student
from tools.faculty_tools    import get_faculty, add_faculty, assign_subject, get_workload
from tools.attendance_tools import get_low_attendance, mark_attendance, get_student_attendance
from tools.exam_tools       import get_top_students, record_marks, schedule_exam
from tools.course_tools     import get_courses, create_course
from tools.analytics_tools  import get_pass_stats, get_dept_performance, get_enrollment_trends

TOOL_REGISTRY = {
    "student": {
        "get_students": get_students,
        "enroll_student": enroll_student,
        "update_student": update_student,
        "delete_student": delete_student,
    },
    "faculty": {
        "get_faculty": get_faculty,
        "add_faculty": add_faculty,
        "assign_subject": assign_subject,
        "get_workload": get_workload,
    },
    "attendance": {
        "get_low_attendance": get_low_attendance,
        "mark_attendance": mark_attendance,
        "get_student_attendance": get_student_attendance,
    },
    "exam": {
        "get_top_students": get_top_students,
        "record_marks": record_marks,
        "schedule_exam": schedule_exam,
    },
    "course": {
        "get_courses": get_courses,
        "create_course": create_course,
    },
    "analytics": {
        "get_pass_stats": get_pass_stats,
        "get_dept_performance": get_dept_performance,
        "get_enrollment_trends": get_enrollment_trends,
    }
}
