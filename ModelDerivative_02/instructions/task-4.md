# Task 4 - Download the STL file

> **Important:** These instructions are specific to Postman V10. If you are using a newer version of Postman, you may notice slight differences in the interface or steps. However, the process should remain similar.

Before you download the STL file, make sure that the translation job is complete. In the previous task, you captured the URN of the generated STL file in a variable named `dv_urn_0`.


## Obtain Signed Cookie

To securely download the generated STL file, you must obtain a download link and a signed cookie. The link and cookie will be valid only for a limited amount of time. To request these:

1. In the Postman sidebar, click **Task 4 - Download STL File > GET Obtain Signed Cookie**. The request loads.

   Note the use of the variables `t2_url_safe_urn_of_source` and `dv_urn_0` as URI parameters.

2. Click the **Headers** tab. Notice that the `Authorization` header is already defined.

    ![Obtain Signed Cookie](../images/tutorial02_obtain_signed_cookies_01.png "Obtain Signed Cookie")

3. Click **Send**. You should see a screen similar to the following image.

   Notice how the response body contains the download URL. A script in the **Tests** tab captures the download URL to the `ContentDownloadSignedURL`  Postman   environment variable.

    ![Obtained Cookie](../images/tutorial02_obtain_signed_cookies_02.png "Obtained Cookie")
    
4. Click on the Response **Headers** tab. Notice how the response contains 3 header parameters named `set-cookie`. A script in the **Tests** saves the values of these parameters to the `set-cookie-header_1`, `set-cookie-header_2`, and `set-cookie-header_3` environment variables.

    ![Response Headers](../images/tutorial02_obtain_signed_cookies_03.png "Response Headers")
    
 ## Download STL file.

Now that you have obtained the download link and signed cookie, you can download the STL file. To download the STL file:

1. In the Postman sidebar, click **Task 4 - Download STL File > GET Download STL File**. The request loads.

   Note the use of the variable `ContentDownloadSignedURL` as the URI.

2. Click the **Headers** tab. Notice that the `Cookie` header is composed of `set-cookie-header_1`, `set-cookie-header_2`, and `set-cookie-header_3`.

    ![Cookie Headers Download](../images/tutorial02_download_stl_file_01.png "Cookie Headers Download")

3. Click **Send**. You should see a screen similar to the following image. In the response area, click **Save Response > Save to a file**. Save the file as *tuner.stl*, when prompted.

    ![Download Result](../images/tutorial02_download_stl_file_02.png "Download Result")

Congratulations! You have completed this walkthrough.

To display the saved file:

- If you are using an Apple Macintosh, right-click *tuner.stl* in Finder and select **Quick Look** from the menu.
- If you are using Windows, right-click *tuner.stl* in Windows Explorer and select **Open with > 3D Viewer** from the menu.

[:rewind:](../readme.md "readme.md") [:arrow_backward:](task-3.md "Previous task")
