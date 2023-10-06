# Task 7 - Download the results

Once the WorkItem has completed executing the Activity, Design Automation uploads the resulting files to OSS. You use the Data Management API to download the files to your local machine.


## Get temporary download URL of the resized IPT file

1. On the Postman sidebar, click **Task 7 - Download the Result > GET Get S3 Download URL for Resized IPT file**. The request loads.

2. Click **Send**. You should see a screen similar to the following image.

    ![Download Result](../images/task7-download_step_1.png "Download Result")

## Download the resized IPT file from OSS

1. On the Postman sidebar, click **Task 7 - Download the Result > GET Download Resized IPT file from OSS**. The request loads.

2. Click **Send**. You should see a screen similar to the following image.

    ![Download Result](../images/task7-download_step_2.png "Download Result")

3. In the response area, click **Save response to file**. The output file downloads. Save the file as a *.bmp* file.

    ![Save Result](../images/task7-download_step_2b.png "Save Result")

## Get temporary download URL of the generated BMP file

1. On the Postman sidebar, click **Task 7 - Download the Result > GET Get S3 Download URL for Generated BMP**. The request loads.

2. Click **Send**. You should see a screen similar to the following image.

    ![Download Result](../images/task7-download_step_3.png "Download Result")


## Download generated BMP file from OSS

1. On the Postman sidebar, click **Task 7 - Download the Result > GET Download Generated BMP**. The request loads.

    ![Download Result](../images/task7-download_step_4.png "Download Result")

2. Click **Send**. You should see a screen similar to the following image.

3. In the response area, click **Save Response > Save to a file**. The output file downloads. Save the file as a *.bmp* file.

    ![Download Result](../images/task7-download_step_5.png "Download Result")
