#!/bin/bash
# Modified from https://raw.githubusercontent.com/aws-samples/startup-kit-serverless-workload/master/install.sh

DIGITS_RE='^[0-9]+$'
TEMPLATE_FILE_NAME='template.yml'
PACKAGE_FILE_NAME='packaged.yml'
STACK_NAME='laconia-examples-sam'

# Check if the aws cli is installed
if ! command -v aws > /dev/null; then
    echo "aws cli was not found. Please install before running this script."
    exit 1
fi

ACCOUNT_ID=`aws sts get-caller-identity --query 'Account' --output=text`
REGION=`aws configure get region`
BUCKET_NAME="${ACCOUNT_ID}-${REGION}-${STACK_NAME}"

# Check if the account id is valid
if ! [[ ${ACCOUNT_ID} =~ ${DIGITS_RE} ]] ; then
   echo "Invalid account ID" >&2
   exit 1
fi

# Check if the bucket already exists
BUCKETS_EXISTS=`aws s3 ls | grep ${BUCKET_NAME}`
if [ ! -z "${BUCKETS_EXISTS}" -a "${BUCKETS_EXISTS}" != " " ]; then
  echo "Bucket ${BUCKET_NAME} already exists. You can remove it from the AWS S3 console"
  echo "https://console.aws.amazon.com/s3/home"
else
  # Try to create the bucket
  if aws s3 mb s3://${BUCKET_NAME}; then
      echo "Bucket s3://${BUCKET_NAME} created successfully"
  else
      echo "Failed creating bucket s3://${BUCKET_NAME}"
      exit 1
  fi
fi

echo ""

# Try to create CloudFormation package
if sam package --template-file ${TEMPLATE_FILE_NAME} --output-template-file ${PACKAGE_FILE_NAME} --s3-bucket ${BUCKET_NAME}; then
    echo "CloudFormation successfully created the package ${PACKAGE_FILE_NAME}"
else
    echo "Failed creating CloudFormation package"
    exit 1
fi

# Try to deploy the package
if sam deploy --template-file ${PACKAGE_FILE_NAME} --stack-name ${STACK_NAME} --capabilities CAPABILITY_IAM; then
    echo "CloudFormation successfully deployed the serverless app package"
else
    echo "Failed deploying CloudFormation package"
    exit 1
fi
