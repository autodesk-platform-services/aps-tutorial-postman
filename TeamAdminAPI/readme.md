# Team Admin API walkthrough

![Platforms](https://img.shields.io/badge/Web-Windows|MacOS-lightgray.svg)
[![Postman](https://img.shields.io/badge/Postman-orange.svg)](https://www.getpostman.com/)
![Beginner](https://img.shields.io/badge/Level-Beginner-green.svg)
[![License](https://img.shields.io/:license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

This folder contains a Postman collection with the requests used in the [Team Admin API Get started walkthrough](https://aps.autodesk.com/en/docs/team_admin/v1/tutorials/get-started/) on the APS developer portal. Follow the walkthrough for step-by-step instructions on using these requests.

## Set up

1. Install [Postman](https://www.getpostman.com/downloads/).
2. Import [Team Admin API walkthrough.postman_collection.json](collections/Team%20Admin%20API%20walkthrough.postman_collection.json) into Postman.
3. In the collection's **Variables** tab, set `client_id` and `client_secret` to the credentials of your APS app.
4. On the collection's **Authorization** tab, choose **Get New Access Token** and sign in as a team administrator (3-legged OAuth).

The `url` variable is already set.

If the sign-in page doesn't open or shows "Page Expired", check that your browser allows pop-ups from `autodesk.com`. **Get New Access Token** opens your default browser, and a blocked pop-up can stop the sign-in from completing. If the wrong account is signed in, sign out in that browser and try again.

## Scopes

The collection requests these scopes by default:

| Scope                          | Used for                                |
|--------------------------------|-----------------------------------------|
| `tmadmapi:team:read`           | Team discovery and all read requests    |
| `tmadmapi:team-users:write`    | Invitations                             |
| `tmadmapi:team-products:write` | Creating and deleting assignments       |

Write scopes do not grant read access, so the read scope is included. If you fetched a token before these scopes were added, choose **Get New Access Token** again.

## Variables

Run the team discovery request, then copy the returned IDs into `team_id`, `user_id`, and `product_id`. Set `lookup_email` for the exact member lookup and `invite_email` for invitations.

## Requests

- List administered teams
- List team users
- Get one team user
- Find a team user by exact email
- List product pools
- List team assignments
- List one user's assignments
- Find one user/product assignment
- Create direct team assignment
- Delete direct team assignment
- Invite team user (sends an invitation)

> **Note**
> Invitation and assignment requests change the team. Invitations send email to the invitee.

## License

This sample is licensed under the terms of the [MIT License](../LICENSE).
