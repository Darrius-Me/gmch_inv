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
    is_superuser = models.IntegerField()
    is_admin = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Delivery(models.Model):
    date = models.IntegerField()
    invoice = models.CharField(max_length=255)
    current_total_amount = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'delivery'


class DeliveryItem(models.Model):
    item_id = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    quantity = models.IntegerField()
    manufacturer = models.CharField(max_length=255)
    lot_number = models.CharField(max_length=255)
    expiration_date = models.CharField(max_length=255)
    delivery_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'delivery_item'


class Department(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'department'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
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


class Item(models.Model):
    quantity = models.IntegerField()
    cur_qty = models.IntegerField()
    unit = models.CharField(max_length=11)
    description = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    batch_lot_num = models.CharField(max_length=255)
    expiration_date = models.CharField(max_length=255)
    unit_cost = models.FloatField()
    total_cost = models.FloatField()
    remarks = models.CharField(max_length=255)
    po_id = models.IntegerField()
    manufacturer = models.CharField(max_length=255)
    onhand_qty = models.IntegerField()
    losses = models.IntegerField()
    status = models.IntegerField()
    delivery_date = models.CharField(max_length=255)
    invoice_number = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'item'


class PurchaseOrder(models.Model):
    department_id = models.IntegerField()
    charge_to = models.CharField(max_length=30)
    po_num = models.CharField(max_length=255)
    supplier = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    mode = models.CharField(max_length=255)
    pr_num = models.CharField(max_length=255)
    tracking_num = models.CharField(max_length=255)
    delivery_place = models.CharField(max_length=255)
    delivery_term = models.CharField(max_length=255)
    delivery_date = models.CharField(max_length=255)
    payment_term = models.CharField(max_length=255)
    total_amount = models.IntegerField()
    is_processed = models.IntegerField()
    date_received = models.CharField(max_length=255)
    amount_loss = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'purchase_order'
