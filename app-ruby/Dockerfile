FROM ruby:3.2

WORKDIR /app

COPY hoverfly.crt /usr/local/share/ca-certificates/hoverfly.crt
RUN update-ca-certificates
COPY . /app

RUN bundle install

EXPOSE 4567

CMD ["ruby", "app.rb", "-o", "0.0.0.0", "-p", "4567"]
