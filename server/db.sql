CREATE DATABASE duoroadmap;

CREATE TABLE theme(
    theme_id SERIAL PRIMARY KEY,
    theme_name VARCHAR(255),
    description VARCHAR(255)
);


CREATE TABLE topic(
    topic_id SERIAL PRIMARY KEY,
    topic_name VARCHAR(255),
    theme_id integer REFERENCES theme(theme_id),
    description VARCHAR(255)
);

CREATE TABLE subtopic(
    sutopic_id SERIAL PRIMARY KEY,
    subtopic_name VARCHAR(255),
    theme_id integer REFERENCES theme(theme_id),
    topic_id integer REFERENCES topic(topic_id),
    description VARCHAR(255)
);
