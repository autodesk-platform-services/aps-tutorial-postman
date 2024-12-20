# Task 4 - Extract Metadata

> **Important:** These instructions are specific to Postman V10. If you are using a newer version of Postman, you may notice slight differences in the interface or steps. However, the process should remain similar.

In this task, you'll extract metadata generated in Task 3. First, retrieve a list of model views (Viewables) that can be displayed in the viewer. While Inventor and Fusion 360 files contain only one Viewable per source model, Revit models can contain multiple Viewables. The Revit file in this walkthrough contains seven Viewables. After retrieving the Viewables, select one and use its ID to extract the object properties.

## Retrieve a List of Viewables

To list the Viewables, use the URL-safe Base64-encoded Uniform Resource Name (URN) from your source file. This URN was saved to the `t5_url_safe_urn_of_source` variable during the previous task.

1. In the Postman sidebar, click **Task 4 - Retrieve Metadata > Retrieve a List of Viewables**. The request loads.

2. Click **Send**. You should see a screen like the following image.

   ![list Viewables](../images/tutorial_05_task_4_retrieve_a_list_of_viewables.png "list viewables")

   A script in the **Tests** tab saves the GUIDs of the Viewables to a series of variables: `dv_guid_0` to `dv_guid_6`.

   ![list Viewables](../images/tutorial_05_task_4_guid_of_viewables.png "list viewables")
   
## Get Object Hierarchy

Once the GUID of a Viewable is known you can retrieve its object tree. In this case, we'll fetch the object hierarchy for the Viewable labeled `{3D}`, whose GUID is stored in the Postman environment variable `dv_guid_0`.

1. In the Postman sidebar, click **Task 4 - Retrieve Metadata > Get Object Hierarchy**. The request loads.

   ![list objects](../images/tutorial_05_task_4_get_object_hierrarchy_01.png "list objects")

   Note the use of the variable `dv_guid_0` as a URI parameter.
   
2. Click **Send**. A screen similar to the following is displayed. Note how the object hierrarchy is listed as nested JSON objects.

   ![list objects](../images/tutorial_05_task_4_get_object_hierrarchy_02.png "list objects")


## Retrieve Properties of All Objects in a Viewable

Once the GUID of a Viewable is known, you can get the properties of all objects in it.

1. In the Postman sidebar, click **Task 4 - Retrieve Metadata > Retrieve Properties of Objects in a  Viewable**. The request loads.

   ![list objects](../images/tutorial_05_task_4_retrieve_properties_of_all_objects.png "list objects")

   Note the use of the variable `dv_guid_0` as a URI parameter.

2. Click **Send**. If extracting properties takes time, you see a screen like the following.

   ![list objects success](../images/tutorial_05_task_4_retrieve_properties_of_all_objects_02.png "list objects success")

3. Click **Send** again. You should see a screen like the following.

   ![list objects success](../images/tutorial_05_task_4_retrieve_properties_of_all_objects_03.png "list objects success")

The response body contains the list of object properties.

## Retrieve Specific Properties

Notice how large the response was when you requested all properties. You will need to write more code to process the results to get to the information you need.  Alternatively, you can query only the objects you are interested in and request only the properties you need. 

1. In the Postman sidebar, click **Task 4 - Retrieve Metadata > Retrieve Specific Properties of Specific Objects in a  Viewable**. The request loads.

   ![query objects](../images/tutorial_05_task_4_retrieve_specific_properties_01.png "query objects")

   Note how the request body uses:
   
   - The ``query`` attribute to request objects with names that begin with ``M_Pile-Steel``.
   - The ``fields`` attribute to request specific properties.
   - The ``pagination`` attribute to request a specific page of the paginated results.

2. Click **Send**. You should see a screen similar to the following:

   ![query results](../images/tutorial_05_task_4_retrieve_specific_properties_02.png "query results")

[:rewind:](../readme.md "readme.md") [:arrow_backward:](task-3.md "Previous task")

