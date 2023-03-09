
export const UserInfo = ({ name, email, birthday }) => {
    return (
        <>
            <h4>Your Info</h4>
            <div>
                <span>Name:</span>
                <span>{name}</span>
            </div>
            <div>
                <span>E-mail: </span>
                <span>{email}</span>
            </div>
            <div>
                <span>Birthday: </span>
                <span>{birthday}</span>
            </div>
        </>)
};
