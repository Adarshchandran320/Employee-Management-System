from django.contrib import admin
from .models import Department,Employee,Project,Userdetails
# from rest_framework.authtoken.models import Token

# Register your models here.

admin.site.register(Department)
# admin.site.register(Employee)
admin.site.register(Project)

#Inline clas to display many to many relationship inside the employee admin
class ProjectInline(admin.TabularInline):
    #TabularInline display the related data in a table like format
    #this tells django to use the in termediate(junction )table
    #.through property give us the access to the junction table
    model=Project.employees.through
    #Number of empty row shown in admin for adding new realtionship
    extra=1


#customizing employee admin pannel
class EmployeeAdmin(admin.ModelAdmin):
    #this attached the inline to Employee admin page
    inlines=[ProjectInline]

#register model with the custimized class
admin.site.register(Employee,EmployeeAdmin)
# admin.site.register(Token)
admin.site.register(Userdetails)