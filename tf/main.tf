resource "aws_s3_bucket" "gte-dash-pwa-prod" {
  bucket = "gte-dash-pwa-prod"
}

resource "aws_ssm_parameter" "gte-dash-secret-key" {
  name  = "gte-dash-secret-key"
  type  = "SecureString"
  value = var.gte-dash-secret-key
}