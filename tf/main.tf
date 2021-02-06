resource "aws_s3_bucket" "ev-dashboard-pwa-prod" {
  bucket = "ev-dashboard-pwa-prod"
}

resource "aws_ssm_parameter" "ev-dashboard-secret-key" {
  name  = "ev-dashboard-secret-key"
  type  = "SecureString"
  value = var.ev-dashboard-secret-key
}