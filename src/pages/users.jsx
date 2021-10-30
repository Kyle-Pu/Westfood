import React from "react"

const UsersPage = () => {

    let users = ["Jake", "Ysa", "Preetham", "Prateek", "Kyle"];
    users = users.map((user, idx) => {
        return <li key={idx}>{user}</li>;
    });

    return (
        <div>
            <ol>
                {users}
            </ol>
        </div>
    );
};

export default UsersPage;
