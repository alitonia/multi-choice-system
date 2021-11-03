export const Placeholder = props => {
    return (
        <>
            <h1>This is a placeholder</h1>
            <h3>{JSON.stringify(props || {}, null, 2)}</h3>
        </>
    );
};
