from rest_framework import serializers
from .models import Department, Employee, Project,Userdetails
from datetime import date
import re
from django.contrib.auth.models import User,Group
from django.contrib.auth.hashers import make_password

def date_of_joining_restriction(dateOfJoining):
    today = date.today()
    if dateOfJoining > today:
        raise serializers.ValidationError("The date of joining cannot be in the future")
    return dateOfJoining

def name_validation(employeeName):
    if len(employeeName) < 3 or not re.match("^[A-Za-z ]+$", employeeName):
        raise serializers.ValidationError("Name must be at least 3 characters long and contain only alphabetic characters and spaces")
    return employeeName

def contact_validation(contact):
    if not re.match(r'^\d{10}$', contact):
        raise serializers.ValidationError("Contact must be exactly 10 digits")
    return contact

def department_name_validation(value):
    if len(value) < 2 or not re.match(r"^[A-Za-z &]+$", value):
        raise serializers.ValidationError("Department name must contain only letters, spaces, and '&'")
    return value

def project_name_validation(value):
    if len(value.strip()) < 3:
        raise serializers.ValidationError("Project name must be at least 3 characters")
    return value

# Department must come first — Employee references it below
class DepartmentSerializer(serializers.ModelSerializer):
    DepartmentName = serializers.CharField(validators=[department_name_validation])

    class Meta:
        model = Department
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    Department = DepartmentSerializer(source='DepartmentId', read_only=True)
    DateOfJoining = serializers.DateField(validators=[date_of_joining_restriction])
    EmployeeName = serializers.CharField(validators=[name_validation])
    Contact = serializers.CharField(validators=[contact_validation])
    Designation = serializers.ChoiceField(choices=['Manager', 'Senior Engineer', 'Engineer', 'Intern'])
    project_details = serializers.StringRelatedField(source='projects', many=True, read_only=True)

    class Meta:
        model = Employee
        fields = ('EmployeeId', 'EmployeeName', 'Designation', 'DateOfJoining', 'DepartmentId', 'Department', 'Contact', 'IsActive', 'project_details')

class ProjectSerializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[project_name_validation])
    employee_details = EmployeeSerializer(source='employees', required=False, many=True, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'name', 'employees', 'employee_details')

class UserdetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userdetails
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')
#recieves the registration data,validates it and  hashes the paaword,create the user and assgin the user to 
# a group and finalyy returns the created user.
class SignupSerializer(serializers.ModelSerializer):  #inherit all the features
    group_name = serializers.CharField(write_only=True, required=False)    #password by hasing,restriction,
    #hash the password before saving it to the database

    def create(self, validated_data):
        group_name = validated_data.pop("group_name", None)
        #customizing the create methods
        # we will hash the password
        validated_data["password"] = make_password(validated_data.get("password"))
        #create the user
        user = super(SignupSerializer, self).create(validated_data)

        if group_name:
            group, created = Group.objects.get_or_create(name=group_name)
            user.groups.add(group)
        return user

    class Meta:
        model = User
        fields = ['username', 'password', 'group_name']


class LoginSerializer(serializers.ModelSerializer):
    #field to get username from user
    username=serializers.CharField()
    #field to get password from user
    password=serializers.CharField(write_only=True)

    class Meta:
        model=User
        fields=['username','password']
