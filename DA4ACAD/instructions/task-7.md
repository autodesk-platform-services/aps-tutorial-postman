# Task 7 - Download the results

Once the WorkItem has completed executing the Activity, Design Automation uploads the resulting text file to OSS. You use the Data Management API to download the text file to your local machine.


## Get temporary download URL for the result

1. On the Postman sidebar, click **Task 7 - Download the Result > GET S3 Download URL for the result**. The request loads.

2. Click **Send**. You should see a screen similar to the following image.

    ![Download URL](../images/task7-download_url.png "Download URL")



## Download the output from OSS

1. On the Postman sidebar, click **Task 7 - Download the Result > GET Download Output from OSS**. The request loads.

2. Click **Send**. You should see a screen similar to the following image.

    ![Download Result](../images/task7-download_step_1.png "Download Result")

3. In the response area, click **Save response to a file**. The output file downloads. Save the file as a *.txt* file, when prompted to.

    ![Download Result](../images/task7-download_step_2.png "Download Result")

[:rewind:](../readme.md "readme.md") [:arrow_backward:](task-6.md "Previous task")
