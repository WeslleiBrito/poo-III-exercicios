-- Active: 1690292793040@@127.0.0.1@3306

CREATE TABLE
    IF NOT EXISTS super_heroes (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL UNIQUE,
        universe TEXT NOT NULL,
        image_url TEXT NOT NULL UNIQUE,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL
    );

INSERT INTO
    super_heroes (id, name, universe, image_url)
VALUES (
        'sp001',
        'Thor',
        'Marvel',
        'https://w7.pngwing.com/pngs/76/365/png-transparent-thor-thor-jane-foster-marvel-cinematic-universe-thor-avengers-fictional-character-film-thumbnail.png'
    ), (
        'sp002',
        'Deadpoll',
        'Marvel',
        'https://w7.pngwing.com/pngs/410/969/png-transparent-marvel-deadpool-illustration-marvel-avengers-alliance-deadpool-thor-wolverine-marvel-comics-deadpool-s-comics-superhero-comic-book-thumbnail.png'
    ), (
        'sp003',
        'Pantera Negra',
        'Marvel',
        'https://w7.pngwing.com/pngs/617/74/png-transparent-black-panther-black-panther-marvel-avengers-alliance-black-bolt-marvel-cinematic-universe-marvel-comics-black-panther-comics-marvel-avengers-assemble-fictional-characters-thumbnail.png'
    ), (
        'sp004',
        'Batman',
        'DC',
        'https://w7.pngwing.com/pngs/192/750/png-transparent-batman-batman-diana-prince-superman-dc-rebirth-costume-dc-comics-fictional-characters-superhero-comic-book-thumbnail.png'
    ), (
        'sp005',
        'Mulher Maravilha',
        'DC',
        'https://w7.pngwing.com/pngs/604/940/png-transparent-dc-wonder-woman-diana-prince-themyscira-dc-rebirth-dc-comics-wonder-women-comics-fictional-characters-superhero-thumbnail.png'
    );

SELECT * FROM super_heroes;