# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Cosecha(models.Model):
    pk_cosecha = models.AutoField(primary_key=True)
    fk_sembrio = models.ForeignKey('Sembrio', models.DO_NOTHING, db_column='fk_sembrio', blank=True, null=True)
    cantidad_valor = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    fecha_cosecha = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cosecha'


class Cultivos(models.Model):
    id = models.BigAutoField(primary_key=True)
    departamento = models.CharField(max_length=255, blank=True, null=True)
    distrito = models.CharField(max_length=255, blank=True, null=True)
    fecha_siembra = models.DateField(blank=True, null=True)
    nombre = models.CharField(max_length=255, blank=True, null=True)
    usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cultivos'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Pregunta(models.Model):
    pk_pregunta = models.AutoField(primary_key=True)
    pregunta = models.TextField(blank=True, null=True)
    respuesta = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pregunta'


class RegistroFertilizacion(models.Model):
    pk_fertilizacion = models.AutoField(primary_key=True)
    fk_sembrio = models.ForeignKey('Sembrio', models.DO_NOTHING, db_column='fk_sembrio', blank=True, null=True)
    fecha_fertilizacion = models.DateField(blank=True, null=True)
    tipo_fertilizante = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'registro_fertilizacion'


class Sembrio(models.Model):
    pk_sembrio = models.AutoField(primary_key=True)
    semilla = models.CharField(max_length=100, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    fk_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='fk_usuario', blank=True, null=True)
    fk_tipo_suelo = models.ForeignKey('TipoSuelo', models.DO_NOTHING, db_column='fk_tipo_suelo', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sembrio'


class TipoSuelo(models.Model):
    pk_tipo_suelo = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'tipo_suelo'


class Usuario(models.Model):
    pk_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, blank=True, null=True)
    apellido = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    contraseña = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.CharField(max_length=255, blank=True, null=True)
    fk_pregunta = models.ForeignKey(Pregunta, models.DO_NOTHING, db_column='fk_pregunta', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuario'


class Usuarios(models.Model):
    id = models.BigAutoField(primary_key=True)
    apellido = models.CharField(max_length=255, blank=True, null=True)
    dominio_hd = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(unique=True, max_length=255, blank=True, null=True)
    email_verificado = models.BooleanField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)
    foto_perfil_url = models.CharField(max_length=500, blank=True, null=True)
    google_id = models.CharField(unique=True, max_length=255, blank=True, null=True)
    nombre = models.CharField(max_length=255, blank=True, null=True)
    nombre_pila = models.CharField(max_length=255, blank=True, null=True)
    ultimo_login = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuarios'
