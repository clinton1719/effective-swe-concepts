---
title: AWS Machine Learning Quiz
tags: [aws, aws-transcribe, aws-sagemaker, aws-lex, aws-polly, aws-rekognition, aws-comprehend, aws-forecast, aws-personalize, aws-translate, aws-textract]
difficulty: medium
date: 2026-04-14
---

## Question 1

A developer would like to build, train, and deploy a machine learning model quickly. Which service can he use?


[x] SageMaker

[ ] Polly

[ ] Comprehend

[ ] Personalize

**Correct Answer:** ✅ SageMaker

**Explanation:** **Amazon SageMaker** is a fully managed service that provides every developer and data scientist with the ability to build, train, and deploy machine learning (ML) models quickly. It removes the heavy lifting from each step of the machine learning process to make it easier to develop high-quality models. It includes hosted Jupyter notebooks for exploration, built-in algorithms optimized for speed and scale, and a one-click deployment process to production-ready endpoints.

## Question 2

You would like to find objects, people, text, or scenes in images and videos. What AWS service should you use?


[x] Rekognition

[ ] Polly

[ ] Kendra

[ ] Lex

**Correct Answer:** ✅ Rekognition

**Explanation:** **Amazon Rekognition** is a computer vision service that makes it easy to add image and video analysis to your applications. It uses proven, highly scalable, deep learning technology that requires no machine learning expertise to use. With Rekognition, you can identify objects, people, text, scenes, and activities, as well as detect any inappropriate content. It also provides highly accurate facial analysis and facial search capabilities to detect, analyze, and compare faces for a wide variety of user verification and public safety use cases.

## Question 3

You should use Amazon Transcribe to turn text into lifelike speech using deep learning.


[ ] True

[x] False

**Correct Answer:** ✅ False

**Explanation:** The statement is reversed. **Amazon Transcribe** is used for **Speech-to-Text** (converting audio into text). To turn text into lifelike speech, you should use **Amazon Polly**. Polly uses advanced deep learning technologies to synthesize natural-sounding human speech, allowing you to create applications that talk and build entirely new categories of speech-enabled products.

## Question 4

Which of the following services is a document search service powered by machine learning?


[ ] Translate

[x] Kendra

[ ] Comprehend

[ ] Polly

**Correct Answer:** ✅ Kendra

**Explanation:** **Amazon Kendra** is an intelligent search service powered by machine learning. Unlike traditional search engines that rely on keyword matching, Kendra uses natural language processing to understand the context of a question and return precise answers from across your various content repositories (such as S3, SharePoint, Salesforce, or ServiceNow). It is designed to help employees or customers find information buried in manuals, research reports, FAQs, and HR portals by simply asking a question in plain English.

## Question 5

A start-up would like to rapidly create customized user experiences. Which AWS service can help?


[x] Personalize

[ ] Kendra

[ ] Connect

**Correct Answer:** ✅ Personalize

**Explanation:** **Amazon Personalize** is a fully managed machine learning service that allows developers to quickly build and deploy curated recommendations and personalized user experiences—similar to what is used on Amazon.com. It can handle specific use cases like "Frequently bought together," "Because you watched," or personalized re-ranking of search results. You don't need machine learning expertise; you simply provide your data (such as clicks, page views, or sign-ups) to the service, and it handles the complex model training and hosting.

## Question 6

Amazon Polly allows you to turn text into speech. It has two important features. First is ……………….. which allows you to customize the pronunciation of words (e.g., “Amazon EC2” will be “Amazon Elastic Compute Cloud”). The second is ……………….. which allows you to emphasize words, including breathing sounds, whispering, and more.


[ ] Speech Synthesis Markup Language (SSML), Pronunciation Lexicons

[ ] Pronunciation Lexicons, Security Assertion Markup Language (SAML)

[x] Pronunciation Lexicons, Speech Synthesis Markup Language (SSML)

[ ] Security Assertion Markup Language (SAML), Pronunciation Lexicons

**Correct Answer:** ✅ Pronunciation Lexicons, Speech Synthesis Markup Language (SSML)

**Explanation:** * **Pronunciation Lexicons:** These allow you to customize the pronunciation of specific words or phrases. For example, you can ensure that "AWS" is spoken as "Amazon Web Services" instead of just the letters.
* **Speech Synthesis Markup Language (SSML):** This is a standard markup language that gives you fine-grained control over how Polly generates speech. You can use SSML tags to add pauses, change the pitch, emphasize specific words, or even include effects like whispering or "newscaster" speaking styles.

## Question 7

A company is managing an image and video sharing platform which is used by customers around the globe. The platform is running on AWS using an S3 bucket to host both images and videos and using CloudFront as the CDN to deliver content to customers all over the world with low latency. In the last couple of months, a lot of customers have complained that they have started to see inappropriate content on the platform which started to increase in the last week. It will be very expensive and time-consuming to manually approve those images and videos by employees before its published on the platform. There is a requirement to find a solution that can automatically detect inappropriate and offensive images and videos and give you the ability to set a minimum confidence threshold for items that will be flagged and allows for manual review. Which AWS service can fit the requirement?


[ ] Amazon Polly

[ ] Amazon Translate

[ ] Amazon Lex

[x] Amazon Rekognition

**Correct Answer:** ✅ Amazon Rekognition

**Explanation:** **Amazon Rekognition** provides a **Content Moderation** feature that automatically detects inappropriate, unwanted, or offensive content in images and videos. It provides a detailed hierarchy of labels (e.g., "Suggestive," "Violence") and a **confidence score** for each. You can set a threshold (for example, any image with a "Violence" label score higher than 80%) to automatically flag or blur content. Furthermore, it integrates with **Amazon Augmented AI (A2I)** to allow for a human-in-the-loop workflow, where flagged items can be sent to manual reviewers for a final decision.

## Question 8

A company would like to implement a chatbot that will convert speech-to-text and recognize the customers' intentions. What service should it use?


[ ] Transcribe

[ ] Rekognition

[ ] Connect

[x] Lex

**Correct Answer:** ✅ Lex

**Explanation:** **Amazon Lex** is the service used to build conversational interfaces (chatbots) using voice and text. It uses the same deep learning technologies as Amazon Alexa. Lex handles the complex task of **Automatic Speech Recognition (ASR)** to convert speech to text, and **Natural Language Understanding (NLU)** to recognize the "intent" behind the user's words (e.g., "I want to book a hotel"). While Transcribe also does speech-to-text, Lex is specifically designed for the interactive, intent-driven logic required for bots.

## Question 9

A company would like to convert its documents into different languages, with natural and accurate wording. What should they use?


[ ] Transcribe

[ ] Polly

[x] Translate

[ ] WordTranslator

**Correct Answer:** ✅ Translate

**Explanation:** **Amazon Translate** is a neural machine translation service that delivers fast, high-quality, and affordable language translation. Unlike traditional rule-based translation, it uses deep learning models to understand context, providing more natural and accurate wording. It supports translation between dozens of languages and is commonly used for localizing websites, apps, and large volumes of documents. It also offers a "Custom Terminology" feature to ensure that brand-specific names or technical terms are translated exactly as you prefer.

## Question 10

Which fully managed service can deliver highly accurate forecasts?


[ ] Personalize

[ ] SageMaker

[ ] Lex

[x] Forecast

**Correct Answer:** ✅ Forecast

**Explanation:** **Amazon Forecast** is a fully managed service that uses machine learning to deliver highly accurate forecasts. Based on the same technology used for time-series forecasting at Amazon.com, it can examine historical data (such as inventory levels, web traffic, or financial metrics) and combine it with related data (such as product features, weather, or holidays) to predict future trends. It automatically handles the complex task of selecting the right algorithms and training models so you can focus on using the predictions to optimize your business.

## Question 11

An online medical company that allows you to book an appointment with doctors through a phone call is using AWS to host their infrastructure. They are using Amazon Connect and Amazon Lex to receive calls and create a workflow, book an appointment, and pay. According to the company’s policy, all calls must be recorded for review. But, there is a requirement to remove any Personally Identifiable Information (PII) from the call before it's saved. What do you recommend to use which helps in removing PII from calls?


[ ] Amazon Polly

[x] Amazon Transcribe

[ ] Amazon Rekognition

[ ] Amazon Translate

**Correct Answer:** ✅ Amazon Transcribe

**Explanation:** **Amazon Transcribe** features a capability called **Automatic Content Redaction**. When processing audio files or streams, Transcribe can automatically identify and redact **Personally Identifiable Information (PII)**, such as social security numbers, credit card details, names, and contact information. In this medical appointment scenario, you would use Transcribe to convert the recorded call to text while redacting the sensitive data, ensuring the saved transcripts comply with the company's privacy policies.

## Question 12

A medical company is in the process of implementing a solution to detect, extract, and analyze information from unstructured medical text like doctors’ notes, clinical trial reports, and radiology reports. Those documents are uploaded and stored on S3 buckets. According to the company’s regulations, the solution must be designed and implemented to keep patients’ privacy by identifying Protected Health Information (PHI) so the solution will be eligible with HIPAA. Which AWS service should you use?


[x] Amazon Comprehend Medical

[ ] Amazon Rekognition

[ ] Amazon Polly

[ ] Amazon Translate

**Correct Answer:** ✅ Amazon Comprehend Medical

**Explanation:** **Amazon Comprehend Medical** is a specialized Natural Language Processing (NLP) service designed specifically for healthcare. It can automatically extract medical information such as medications, dosages, procedures, and conditions from unstructured text. Crucially for this requirement, it includes a **PHI (Protected Health Information) extraction** feature. This allows the company to identify and redact sensitive patient data, ensuring that their data processing workflows remain compliant with **HIPAA** regulations.

## Question 13

A research team would like to group articles by topics using Natural Language Processing (NLP). Which service should they use?


[ ] Translate

[x] Comprehend

[ ] Lex

[ ] Rekognition

**Correct Answer:** ✅ Comprehend

**Explanation:** **Amazon Comprehend** is a natural language processing (NLP) service that uses machine learning to find insights and relationships in text. One of its key features is **Topic Modeling**, which can automatically examine a large collection of documents (like research articles) and group them into clusters based on common themes or topics. It can also perform sentiment analysis, entity recognition (identifying people, places, or brands), and language detection, making it the perfect tool for analyzing unstructured text data.

## Question 14

Which AWS service makes it easy to convert speech-to-text?


[ ] Connect

[ ] Translate

[x] Transcribe

[ ] Polly

**Correct Answer:** ✅ Transcribe

**Explanation:** **Amazon Transcribe** is a fully managed Automatic Speech Recognition (ASR) service that makes it easy for developers to add speech-to-text capability to their applications. It can be used for real-time streaming audio or for processing batch audio files. Transcribe is highly versatile, offering features like speaker identification (who said what), channel identification, and automatic punctuation. As discussed in previous questions, it is the primary tool for creating transcripts and redacting sensitive PII from audio recordings.