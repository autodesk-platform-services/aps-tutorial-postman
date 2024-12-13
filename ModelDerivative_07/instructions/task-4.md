## Option 1: Embed the source file URN in an HTML page you create

> **Important:** These instructions are specific to Postman V10. If you are using a newer version of Postman, you may notice slight differences in the interface or steps. However, the process should remain similar.


1. Insert an instance of the Viewer in an HTML page, and initialize it as per the instructions provided in the following Viewer documentation topics on the APS developer portal:

    a. [Add Viewer to an HTML Page](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/starting-html/)

    b. [Intialize Viewer](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/initialization/)

    **Note:**

    SVF and SVF2 require different settings for the `api` and `env` parameters at initialization. 
    See the following table for the values to use for this walkthrough:


    | Parameter       | SVF2                   |
    |-----------------|------------------------|  
    | `api`           | streamingV2            |
    | `env`           | AutodeskProduction2    |




2. Embed the URL safe Base64-encoded URN of the source file, which you obtained in the previous task, as described in the topic [Load a Model](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/load-a-model/)

Note: You must prepend ``urn:`` to the URL safe Base64-encoded URN, when you embed it in the JavaScript code, as shown in the following image.

![URN in Viewer](../images/tutorial_4_urn_in_viewer.png "URN in Viewer")

## Option 2: Provide source file URN as an input to an existing HTML page

We have created a web page based on the instructions provided in Option 1. You can use it to verify the SVF2 file you just generated. 


1. Display the webpage by clicking the link in the following table:

| SVF2                                                                                      |
|:-----------------------------------------------------------------------------------------:|
|[Show Web page](https://autodesk-platform-services.github.io/aps-tutorial-postman/display_svf2.html) |
| ![SVF2 Web Page](../../ModelDerivative_04/images/tutorial_4_urn_in_html_page_svf2.png)                         |
|[Show Source](../../docs/display_svf2.html)                                                |



2. In the **Access Token** box, specify the access token you obtained in task 1 of this walkthrough.

3. In the **Source File URN (encoded)** box, specify the URL safe Base64-encoded URN of the source file, which you obtained in task 3.

4. Click **Submit**.

5. From the **Choose a viewable** drop-down, select **New Construction**.

  ![Select Viewable](../images/tutorial_7_select_viewables.png "Select Viewable")

6. Click the **Model Browser** button. The Model Browser displays.

  ![Select Model Browser](../images/tutorial_7_select_model_browser.png "Select Model Browser")

  Note that spaces are now listed in the Model Browser. Spaces are hidden by default, just like they are in Revit. Click the "eye icon" next to **Spaces** to display it.

  ![Spaces](../images/tutorial_7_spaces.png "Spaces")


[:rewind:](../readme.md "readme.md") [:arrow_backward:](task-3_op2.md "Previous task")
