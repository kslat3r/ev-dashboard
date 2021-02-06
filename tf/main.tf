resource "aws_s3_bucket" "gte-dash-prod" {
  bucket = "gte-dash.edkelly.co.uk"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_ssm_parameter" "gte-dash-secret-key" {
  name  = "gte-dash-secret-key"
  type  = "SecureString"
  value = var.gte-dash-secret-key
}