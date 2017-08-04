

CREATE TABLE sena (
id			int(255) auto_increment not null,
instrument 		varchar(255),
trend text,
td1		varchar(255),
td2		varchar(255),
graph_image	varchar(255),
date_signal		varchar(255),

CONSTRAINT pk_productos PRIMARY KEY(id)
)ENGINE=InnoDb;