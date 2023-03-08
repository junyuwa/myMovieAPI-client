
export const UserInfo = ({ name, email, birthday }) => {
    return (
        <>
            <div>
                <span>Username:</span>
                <span>{name}</span>
            </div>
            <div>
                <span>Email: </span>
                <span>{email}</span>
            </div>
            <div>
                <span>Birthday: </span>
                <span>{birthday}</span>
            </div>
        </>)
};
