# Task 2 - Create a Nickname

APS uses the Client ID to uniquely identify an app. The Client ID can be long and cryptic, and hence a source of irritation when you reference the data you add to your app.

A Nickname lets you map a Client ID to an easy-to-use name that you can use in place of the Client ID. This tutotial uses the `dasNickName` Postman Environment Variable to store the Nickname.

**Notes:**

- If your app doesn't have any data, you can map the app to another nickname, and the new nickname will overwrite the old one. Once you add data to an App, you are not allowed to set a nickname for it. This is true even if you have not yet assigned a nickname for the app. The only way you can assign a nickname to an app with data is by first calling `[DELETE] /forgeapps/me`. This deletes all data associated with that app, including the nickname. The request **Extras > Delete App Data in Design Automation** in this Postman Collection calls (`[DELETE] /forgeapps/me`) and clears the app of all data.

    ![Delete App Data](../images/task3-delete_forge_app.png "Delete app")

- If you get stuck while working on this walkthrough, and are unable to proceed because your app has data, you can use **DEL Delete app** to clear all data from the app, and restart from Task 2.


- Nicknames must be globally unique.  If the nickname is already in use, even by someone else, APS returns a `409 Conflict` error when you try to set the Nickname.

## Save the Nickname to a variable

1. Click the **Environment quick look** icon on the upper right corner of Postman.

2. In the **CURRENT VALUE** column, in the **dasNickName** row, enter a Nickname for your app.

   ![Nickname Variable](../images/task3-environment_variables_grid.png "Nickname Variable")


3. Click the **Environment quick look** icon again, to hide the variables.

## Send a request to set the Nickname

1. On the Postman sidebar, click **Task 2 - Create a Nickname > PATCH Create Nickname**. The request loads.

2. Click  **Send**. If the request is successful, you should see a response similar to the following image. Note that the response has only a header and no body.

    ![Successful nickname](../images/task3-successfull.png "Successful Nickname")

[:rewind:](../readme.md "readme.md") [:arrow_backward:](task-2.md "Previous task") [:arrow_forward:](task-4.md "Next task")
