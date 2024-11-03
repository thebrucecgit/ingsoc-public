from random import choice, randint
import sqlite3


class Database:
    def __init__(self):
        self._con = self.create_connection("people.db") 
        self._cur = self._con.cursor()
        self.setup_database()

    def create_connection(self, db_file):
        con = sqlite3.connect(db_file)
        return con

    def setup_database(self):
        self._cur.execute('''
            CREATE TABLE IF NOT EXISTS people (
                ip TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                dob NUMERIC NOT NULL,
                score INTEGER NOT NULL,
                status INTEGER NOT NULL
            );
        ''')

        self._cur.execute('''
            CREATE TABLE IF NOT EXISTS requests (
                ip TEXT NOT NULL,
                url TEXT NOT NULL,
                request TEXT NOT NULL
            );
        ''')

        # with open("examples/ex1.html", "r", encoding="utf-8") as html_file:
        #     html_content_1 = html_file.read()

        # with open("examples/ex3.html", "r", encoding="utf-8") as html_file:
        #     html_content_2 = html_file.read()

        # with open("examples/ex4.html", "r", encoding="utf-8") as html_file:
        #     html_content_3 = html_file.read()

        # with open("examples/ex5.html", "r", encoding="utf-8") as html_file:
        #     html_content_4 = html_file.read()

        # with open("examples/ex2.html", "r", encoding="utf-8") as html_file:
        #     html_content_5 = html_file.read()

        # with open("examples/demo/demo1.html", "r", encoding="utf-8") as html_file:
        #     demo_content_1 = html_file.read()

        # with open("examples/demo/demo2.html", "r", encoding="utf-8") as html_file:
        #     demo_content_2 = html_file.read()

        # self.add_person("133.10.14.207", "Alice", "1984-07-31", 10, 0)
        # self.add_person("103.73.55.239", "Bob", "1982-05-03", 20, 0)
        # self.add_person("189.57.99.97", "Charlie", "1992-04-21", 80, 1)
        # self.add_person("118.236.165.52", "Dave", "1947-01-11", 100, 1)
        # self.add_request("133.10.14.207", "https://www.theguardian.com/us-news/2024/nov/02/wisconsin-election-undecided-voters", html_content_1)
        # self.add_request("103.73.55.239", "https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/eight-tips-for-healthy-eating/", html_content_2)
        # self.add_request("189.57.99.97", "https://www.sciencedirect.com/science/article/pii/S0169534724002246", html_content_3)
        # self.add_request("118.236.165.52", "https://www.bbc.co.uk/news/articles/c0veg88g7jyo", html_content_4)
        # self.add_request("118.236.165.52", "https://www.bbc.co.uk/", html_content_5)
        # self.add_request("118.236.165.52", "https://royalsociety.org/news-resources/projects/climate-change-evidence-causes/basics-of-climate-change/", demo_content_1)
        # self.add_request("118.236.165.52", "https://www.thehotline.org/resources/healthy-relationships/", demo_content_2)

        self._con.commit()

    def read_good(self):
        result = self._cur.execute("SELECT * FROM people WHERE status = 1 ORDER BY score DESC")
        return result
    
    def read_bad(self):
        result = self._cur.execute("SELECT * FROM people WHERE status = 0 ORDER BY score DESC")
        return result
    
    def add_person(self, ip, name, dob, score, status):
        self._cur.execute(
            "INSERT INTO people (ip, name, dob, score, status) VALUES (?, ?, ?, ?, ?)", 
            (ip, name, dob, score, status)
        )

        self._con.commit()

    def add_request(self, ip, url, request):
        self._cur.execute(
            "INSERT INTO requests (ip, url, request) VALUES (?, ?, ?)",
            (ip, url, request)
        )
        self._con.commit()

        # Check if the person with that ip address is already in the people table. 
        # If they aren't there, add them.
        self._cur.execute(
            "SELECT 1 FROM people WHERE ip = ?",
            (ip,)
        )
        
        if self._cur.fetchone() is None:
            names = ["Lillie Foley", "Musa Soto", "Suzanne Blevins"]
            dobs = ["1987-04-09", "2001-07-19", "1946-11-07"]
            random_score = randint(0, 100)
            self.add_person(ip, choice(names), choice(dobs), random_score, 1 if random_score >= 50 else 0)
        else:
            self.calculate_score(ip, request)

    def remove_person(self, name):
        self._cur.execute(
            "DELETE FROM people WHERE name = ?", 
            (name,)
        )

        self._con.commit()

    def calculate_score(self, ip, request):
        ((result, ),) = self._cur.execute('''
            SELECT score FROM people 
            WHERE ip = ?
        ''', (ip,)).fetchall()

        updated_score = result + randint(0, 10)

        self._cur.execute('''
            UPDATE people
            SET score = ?
            WHERE ip = ?
        ''', (updated_score, ip))

        self._con.commit()

    def fetch_user_details(self, name):
        # Fetch user details based on the name
        self._cur.execute('''
            SELECT ip, name, dob, score, status FROM people WHERE name = ?
        ''', (name,))
        user_details = self._cur.fetchone()
        
        if user_details is not None:
            # Fetch recent urls associated with the user
            self._cur.execute('''
                SELECT url FROM requests WHERE ip = ?
            ''', (user_details[0],))
            urls = [row[0] for row in self._cur.fetchall()]

            return (user_details, urls)
        
        return (None, None)

    def fetch_request_by_ip(self, ip):
        # Fetch request based on ip
        self._cur.execute('''
            SELECT request FROM requests WHERE ip = ?
        ''', (ip,))

        (html,) = self._cur.fetchone()
        return html
    
    def fetch_request_by_url(self, url):
        # Fetch request based on url
        self._cur.execute('''
            SELECT request FROM requests WHERE url = ?
        ''', (url,))

        (html,) = self._cur.fetchone()
        return html