FROM node:lts-bookworm-slim

#RUN npm i -g vite

WORKDIR /app

EXPOSE 5173

#COPY QTnfo /app

#RUN npm i

#ENTRYPOINT [ "/bin/sh", "-c" ]

#CMD [ "vite --host" ]
CMD npm i && npm run host