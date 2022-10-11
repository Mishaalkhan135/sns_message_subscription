import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as sns from "aws-cdk-lib/aws-sns"
import * as subscriptions from "aws-cdk-lib/aws-sns-subscriptions"
import * as cdk from "aws-cdk-lib"
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SnsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here 
    const topic = new sns.Topic(this, 'axiom', {
      displayName: 'Axiom',
    });

    topic.addSubscription(new subscriptions.SmsSubscription('+923183884163'));
    topic.addSubscription(new subscriptions.SmsSubscription('+923152047988'));
    topic.addSubscription(new subscriptions.SmsSubscription('+923472923515'));
    
    const hello = new lambda.Function(this, "hello-mishaal-handler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "myNewLambda.handler",
      functionName: "lambda-example",
      timeout: Duration.minutes(5),
      environment:{
        SNS_SUBSCRIPTION:topic.topicName
      }
  });
   // 👇 subscribe Lambda to SNS topic
   topic.addSubscription(new subscriptions.LambdaSubscription(hello));

   new cdk.CfnOutput(this, 'snsTopicArn', {
     value: topic.topicArn,
     description: 'The arn of the SNS topic',
   })
   
  }
}
