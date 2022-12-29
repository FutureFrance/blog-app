This application is an API with some basic concepts such as:

- Sign-up / Sign-in (advanced one with access and refresh jwt token)
- There are two types of users [blogger, admin]
- Posts can be published or hidden
- Bloggers / admins can create/read/update/delete posts 
- Admin can remove any public post

As infrastructure i've used Node JS with the express framework, as database i used PostgreSQL and Docker to "containerize the app"

- Typescript
- Sequelize
- Jwt
- Docker / Docker-Compose

*To run this container, just clone the repository on your PC.

Now you can see there is a file called "info.txt" in this repository, now create a ".env" file and copy the contents of the "info.txt" file into the newly created ".env" file, BUT *Delete the text after the # (those are 'comments')*, and you can then just delete the "info.txt" file.

Now you are ready to run the container (make sure you have installed docker on your pc), and while being in the main directory run these commands:

```
docker-compose build
docker-compose up
```