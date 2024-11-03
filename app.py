import os
from random import choice, randint
import streamlit as st
import streamlit.components.v1 as components
import sqlite3

from database import Database


def main_page(db):
    st.set_page_config(layout="wide")

    with open( "styles.css" ) as css:
        st.markdown( f'<style>{css.read()}</style>' , unsafe_allow_html=True)
        st.markdown(
            """
            <style>
            [data-testid=stMain] {
                margin: auto;
                text-align: center;
            }
            </style>
            """,
            unsafe_allow_html=True
        )

    col1, col2, col3 = st.columns((0.42,0.16,0.42), vertical_alignment="center")

    with col1:
        st.write("GOOD")
        result = db.read_good()
        st.dataframe(result, width=600)

    with col2:
        st.image("./media/images/eye.png", use_column_width="always")

        name = st.text_input("NAME")
        if st.button("INSPECT USER", use_container_width=True):
            user_details, urls = db.fetch_user_details(name)
            if user_details:
                # Set session state with user details and switch page
                st.session_state["current_page"] = "details"
                st.session_state["user_details"] = user_details
                st.session_state["urls"] = urls
                st.rerun()

    with col3:
        st.write("BAD")
        result = db.read_bad()
        st.dataframe(result, width=600)


def details_page(db):
    col1, col2 = st.columns((0.25, 0.75))

    with col1:
        # Retrieve user details from session state
        if "user_details" in st.session_state:
            ip, name, dob, score, status = st.session_state["user_details"]
            urls = st.session_state["urls"]

            st.write(f"### Details for {name}")
            st.write(f"**IP Address**: {ip}")
            st.write(f"**Date of Birth**: {dob}")
            st.write(f"**Score**: {score}")
            st.write(f"**Status**: {'GOOD' if status == 0 else 'BAD'}")

            st.markdown("***")
            url = st.radio(
                "RECENTLY ACCESSED",
                urls,
                key="url"
            )
        else:
            st.error("No user details available.")

        # Back button to return to main page
        st.markdown("***")
        if st.button("Back", use_container_width=True):
            st.session_state["current_page"] = "main"
            st.rerun()

        st.markdown('</div>', unsafe_allow_html=True)

    with col2:
        html_content = db.fetch_request_by_url(url)

        # # Load and embed the local HTML file in the second column
        # with open("3-afterRestore.html", "r", encoding="utf-8") as html_file:
        #     html_content = html_file.read()

        # Wrap the content in a minimal HTML structure
        minimal_html = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Title</title>
            <style>
                body {{
                    margin: 0;
                    padding: 0;
                    background-color: white; /* Customize as needed */
                    color: black; /* Customize as needed */
                    font-family: sans-serif; /* Reset font */
                }}
                /* You can add other styles here as needed */
            </style>
        </head>
        <body>
            {html_content}
        </body>
        </html>
        """

        # Embed the minimal HTML in Streamlit
        components.html(minimal_html, height=1080, scrolling=True)

def sidebar():
    with st.sidebar:
        st.markdown(
            """
            <style>
            [data-testid=stSidebar] {
                text-align: center;
            }
            </style>
            """,
            unsafe_allow_html=True
        )

        st.image("./media/images/logo.png", use_column_width="always")

        slogans = ["WAR IS PEACE", "FREEDOM IS SLAVERY", "IGNORANCE IS STRENGTH"]
        for slogan in slogans:
            st.markdown(f"<h3>{slogan}</h3>", unsafe_allow_html=True)


def main():
    db = Database()

    # Initialize session state for page navigation
    if "current_page" not in st.session_state:
        st.session_state["current_page"] = "main"

    # Conditional rendering based on current page
    if st.session_state["current_page"] == "main":
        main_page(db)
    elif st.session_state["current_page"] == "details":
        details_page(db)

    sidebar()


if __name__ == "__main__":
    main()
