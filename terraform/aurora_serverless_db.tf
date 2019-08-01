/**
* Aurora Serverless Operational Data Store (ODS)
* Author: Bryan Vaz
* Date Created: 1 Aug 2019
*/

# Environment Specific configurations
locals {
    ods_name = "${local.service_name}-ods-${local.env}"
    ods_instance_name = "${local.service_name}-ods-${local.env}"
    ods_config = {
      count = {
        prod = 1
        uat = 1
        test = 1
        dev = 1   # change to 1 if you need a dev db environment
      }
      instance_class = {
        "prod" = "db.t2.medium"
        "uat" = "db.t2.micro"
        "test" = "db.t2.micro"
        "dev" = "db.t2.micro"
      }
      publicly_accessible = {
        "prod" = "false"
        "uat" = "false"
        "test" = "true"
        "dev" = "true"
      }
      multi_az = {
        "prod" = "true"
        "uat" = "false"
        "test" = "false"
        "dev" = "false"
      }
      backup_retention_period = {
        "prod" = 35 # TODO: A long term archiving process should be setup
        "uat" = 7
        "test" = 3
        "dev" = 3
      }
      deletion_protection = {
        prod = true
        uat = true
        test = false
        dev = false
      }
      kms_key_id = {
        prod = "${local.kms_master_key_arn}"
        uat = "${local.kms_master_key_arn}"
        test = ""
        dev = ""
      }
      storage_encrypted ={
        prod = true
        uat = true
        test = false
        dev = false
      }
      monitoring_interval = {
        prod = 1
        uat = 15
        test = 0
        dev = 0
      }
      apply_immediately = {
        prod = false
        uat = true
        test = true
        dev = true
      }
      skip_final_snapshot = {
        prod = false
        uat = false
        test = true
        dev = true
      }
    }
}

resource "aws_db_instance" "koa_ts_ods" {
  count                      = "${lookup(local.ods_config["count"],local.env)}"
  # Not Applicable for Aurora Databases
  # allocated_storage          = "${lookup(local.ods_config["allocated_storage"],local.env)}"
  # storage_type               = "${lookup(local.ods_config["storage_type"],local.env)}"
  engine                     = "aurora-postgresql"
  # engine_version             = "10.6"
  # instance_class             = "${lookup(local.ods_config["instance_class"],local.env)}"
  identifier                 = "${local.ods_instance_name}"
  name                       = "${local.ods_name}"
  # username                   = "ods_master_user"
  # password                   = "${data.aws_kms_secrets.datafeed_ods_secrets.plaintext["master_password"]}"
  # parameter_group_name       = "${aws_db_parameter_group.datafeed_ods_parameter_group.name}"
  publicly_accessible        = "${lookup(local.ods_config["publicly_accessible"],local.env)}"
  multi_az                   = "${lookup(local.ods_config["multi_az"],local.env)}"
  # backup_retention_period    = "${lookup(local.ods_config["backup_retention_period"],local.env)}"
  backup_window              = "22:00-22:30" # 6PM EST, 10PM GMT, 6AM HKT
  maintenance_window         = "Sat:23:00-Sat:23:30" # 7PM EST, 11PM GMT, 7AM HKT
  copy_tags_to_snapshot      = true
  deletion_protection        = "${lookup(local.ods_config["deletion_protection"],local.env)}"
  kms_key_id                 = "${lookup(local.ods_config["kms_key_id"],local.env)}"
  monitoring_interval        = "${lookup(local.ods_config["monitoring_interval"],local.env)}"
  storage_encrypted          = "${lookup(local.ods_config["storage_encrypted"],local.env)}"
  apply_immediately          = "${lookup(local.ods_config["apply_immediately"],local.env)}"
  skip_final_snapshot        = "${lookup(local.ods_config["skip_final_snapshot"],local.env)}"
  final_snapshot_identifier  = "${local.ods_instance_name}-termination-snapshot"
  vpc_security_group_ids     = ["${aws_security_group.datafeed_ods.id}"]
  auto_minor_version_upgrade = false

  tags {
    Name        = "${local.ods_name}"
    Service     = "${local.service_name}"
    Environment = "${local.env}"
    TerraformManaged = "true"
  }
}
