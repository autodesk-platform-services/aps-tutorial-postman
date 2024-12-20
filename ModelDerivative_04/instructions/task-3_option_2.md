# Task 3 – Translate to SVF2

> **Important:** These instructions are specific to Postman V10. If you are using a newer version of Postman, you may notice slight differences in the interface or steps. However, the process should remain similar.

To translate a file, you must create a translation job. The job produces a manifest that lists all generated files. It also reports the progress of the translation job as a percentage while the translation job is still in progress.

## Start a translation job

For this task, you will use the Base64-encoded URN of the source file. In the previous task, Postman saved this value to the variable `t4_ossEncodedSourceFileURN`, which you will use in the next request.

1. In the Postman sidebar, click **Task 3 - Translate to SVF2 > Start a Translation Job**. The request loads.

2. Click the **Body** tab and take note of the JSON payload.

    ![Create Translation Job JSON Payload](../images/tutorial_04_task_3_start_a_translation_svf_2_01.png "Create Translation Job JSON Payload")

    Note the following:

    - `compressedURN` - A flag that tells the system that the source file is within a zip file.

    - `rootfile` - The main source file. In this case, it is the main assembly file, *suspension.iam*, that contains references to the part files found in the zip file.

    - `type` - The file type that the source file must be translated to; SVF2 in this case.

3. Click **Send**. If the request is successful, you should see a screen similar to the following image.

    ![Successful Submission of Translation Job](../images/tutorial_04_task_3_start_a_translation_svf_2_02.png "Successful Submission of Translation Job")

    Note the `urn` attribute in the JSON response. The value of this attribute is the URL-safe Base64 encoded URN of the source file. A script in the **Tests** tab, saves this value to a variable named `t4_url_safe_urn_of_source`.

## Check status of translation job

Translation jobs take time to complete. There are two ways to check if the translation job is done:

- Periodically check the status of the translation job.

- Set up a webhook to notify you when the job is done.

For this walkthrough, you check the status of the translation job. For more information on webhooks, see the [documentation on Model Derivative webhook events](https://aps.autodesk.com/en/docs/webhooks/v1/reference/events/model_derivative_events)

1. In the Postman sidebar, click **Task 3 - Translate to SVF2 > Check Status of Job**. The request loads.

   ![Check Status of Job](../images/tutorial_04_task_3_check_status_of_job_01.png "Check Status of Job")

   Note the use of the URL-safe Base64-encoded URN of the source file as a URI parameter (the `t4_url_safe_urn_of_source` variable)

2. Click **Send**. You will see a screen similar to the following image.

   ![Successful Job](../images/tutorial_04_task_3_check_status_of_job_03.png "Successful Job")

   Repeat this step until the `progress` attribute becomes `complete`, as shown in the image.


[:rewind:](../readme.md "readme.md") [:arrow_backward:](task-2.md "Previous task") [:arrow_forward:](task-4.md "Next task")
