# Task 3 – Translate Source File

> **Important:** These instructions are specific to Postman V10. If you are using a newer version of Postman, you may notice slight differences in the interface or steps. However, the process should remain similar.

You can translate the source file to many different formats (see [Supported Translations](https://aps.autodesk.com/en/docs/model-derivative/v2/developers_guide/supported-translations/) for details). In this walkthrough, you will translate the source design to the STL format.

To translate a file, you must create a translation job. The job produces a manifest that lists all generated files. It also reports the progress of the translation job as a percentage while the translation job is still in progress.

## Start a translation job

For this task, you will use the Base64-encoded URN of the source file. In the previous task, Postman saved this to the variable `t2_ossEncodedSourceFileURN`, which you will use in the next request.

1. In the Postman sidebar, click **Task 3 - Translate Source File > Start a Translation Job**. The request loads.

2. Click the **Body** tab and take note of the JSON payload.

    ![Create Translation Job JSON Payload](../images/task3_translation_job_json_payload_tt2.png "Create Translation Job JSON Payload")

    Note the difference in the JSON payload from the same task in the previous walkthrough:

    - `compressedURN` - A flag that indicates the source design is inside a zip file.
    - `rootfile` - The main source file. In this case, it is the main assembly file, *Tuner.iam*, which contains references to part files, which are also in the zip file.
    - `type` - The file type to which the source file will be translated; STL in this case.

3. Click **Send**. If the request is successful you should see a screen similar to the following image.

    ![Successful Submission of Translation Job](../images/task3_translation_job_successfull_submission_tt2.png "Successful Submission of Translation Job")

    Note the `urn` attribute in the JSON response. This is the URL-safe Base64 encoded URN of the source file. A script in the **Tests** tab, saves this value to a variable named `t2_url_safe_urn_of_source`.

## Check Status of Translation Job

Translation jobs take time to complete. There are two ways to check if the translation job is done:

- Periodically check the status of the translation job.
- Set up a webhook to notify you when the job is done.

For this walkthrough, you will check the status of the translation job. For more information on webhooks, see the [documentation on Model Derivative webhook events](https://aps.autodesk.com/en/docs/webhooks/v1/reference/events/model_derivative_events)

1. In the Postman sidebar, click **Task 3 - Translate Source File > Check Status of Job**. The request loads.

   ![Check Status of Job](../images/task3_check_status_of_job_tt2.png "Check Status of Job")

   Note the use of the URL-safe Base64-encoded URN of the source file as a URI parameter (the `t2_url_safe_urn_of_source` variable)

2. Click **Send**. You will see a screen similar to the following image.

   ![Successful Job](../images/task3_sucessfull_job_tt2.png "Successful Job")

   When a job is complete, the `progress` attribute becomes `complete`. Repeat this step until the job is complete.

   A script in the **Tests** tab, saves the URN of the STL file to a variable named `dv_urn_0`.

[:rewind:](../readme.md "readme.md") [:arrow_backward:](task-2.md "Previous task") [:arrow_forward:](task-4.md "Next task")
