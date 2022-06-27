import { FormEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { getAllUsersAsync, getUserByIdAsync, createUserAsync } from '../api/userRequests';
import UserGet from '../entities/userGet';
import UserPost from '../entities/userPost';

interface CreateUserAction {
    type: string,
    payload: UserPost
}

const CREATE_USER_ACTION_TYPES = {
    firstName: 'FIRST_NAME',
    lastName: 'LAST_NAME',
    email: 'EMAIL',
    dateOfBirth: 'DATE',
    address1: 'ADDRESS1',
    address2: 'ADDRESS2',
    zipCode: 'ZIP_CODE',
    state: 'COUNTRY_STATE',
};

const DEFAULT_CREATED_USER: UserPost = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: new Date(),
    address1: '',
    address2: '',
    zipCode: '',
    state: ''
};

const userReducer = (state: UserPost, action: CreateUserAction): UserPost => {
    switch (action.type) {
        case CREATE_USER_ACTION_TYPES.firstName:
            return { ...state, firstName: action.payload.firstName }
        case CREATE_USER_ACTION_TYPES.lastName:
            return { ...state, lastName: action.payload.lastName }
        case CREATE_USER_ACTION_TYPES.email:
            return { ...state, email: action.payload.email }
        case CREATE_USER_ACTION_TYPES.dateOfBirth:
            return { ...state, dateOfBirth: action.payload.dateOfBirth }
        case CREATE_USER_ACTION_TYPES.address1:
            return { ...state, address1: action.payload.address1 }
        case CREATE_USER_ACTION_TYPES.address2:
            return { ...state, address2: action.payload.address2 }
        case CREATE_USER_ACTION_TYPES.zipCode:
            return { ...state, zipCode: action.payload.zipCode }
        case CREATE_USER_ACTION_TYPES.state:
            return { ...state, state: action.payload.state }
        default:
            return DEFAULT_CREATED_USER;
    }
};

const User = () => {
    const [users, setUsers] = useState<UserGet[]>([]);
    const [userById, setUserById] = useState<UserGet>();
    const [createUserState, dispatchCreateUser] = useReducer(userReducer, DEFAULT_CREATED_USER);

    const fetchUsersAsync = useCallback(async () => {
        const users = await getAllUsersAsync();
        setUsers(users ?? []);
    }, []);

    const mapUsersToListIem = () => {
        return (
            users.map(user => {
                return (
                    <li key={user.id}>
                        {`ID ${user.id};
                        Full Name: ${user.firstName} ${user.lastName};
                        Email: ${user.email};
                        Date Of Birth: ${user.dateOfBirth};
                        Address 1: ${user.address1};
                        Address 2: ${user?.address2};
                        ZIP Code: ${user.zipCode};
                        State: ${user.state}.`}
                    </li>
                );
            })
        );
    };

    const getUserByIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        const foundUser = await getUserByIdAsync(inputEvent.currentTarget.value);
        setUserById(foundUser);
    };

    const createUserFirstNameHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => dispatchCreateUser({
        type: CREATE_USER_ACTION_TYPES.firstName,
        payload: { firstName: inputEvent.currentTarget.value }
    });

    const createUserLastNameHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => dispatchCreateUser({
        type: CREATE_USER_ACTION_TYPES.lastName,
        payload: { lastName: inputEvent.currentTarget.value }
    });

    const createUserEmailHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => dispatchCreateUser({
        type: CREATE_USER_ACTION_TYPES.email,
        payload: { email: inputEvent.currentTarget.value }
    });

    const createUserDateOfBirthHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => dispatchCreateUser({
        type: CREATE_USER_ACTION_TYPES.dateOfBirth,
        payload: { dateOfBirth: new Date(inputEvent.currentTarget.value) }
    });

    const createUserAddress1HandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => dispatchCreateUser({
        type: CREATE_USER_ACTION_TYPES.address1,
        payload: { address1: inputEvent.currentTarget.value }
    });

    const createUserAddress2HandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => dispatchCreateUser({
        type: CREATE_USER_ACTION_TYPES.address2,
        payload: { address2: inputEvent.currentTarget.value }
    });

    const createUserZipCodeHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => dispatchCreateUser({
        type: CREATE_USER_ACTION_TYPES.zipCode,
        payload: { zipCode: inputEvent.currentTarget.value }
    });

    const createUserCountryStateHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => dispatchCreateUser({
        type: CREATE_USER_ACTION_TYPES.state,
        payload: { state: inputEvent.currentTarget.value }
    });

    const createFormSubmitHandlerAsync = async (formEvent: FormEvent) => {
        formEvent.preventDefault();
        const createdUser = await createUserAsync(createUserState);
        if (createdUser !== undefined) {
            setUsers(prevUsers => [ ...prevUsers, createdUser ]);
        }
    };

    useEffect(() => {
        fetchUsersAsync();
    }, [fetchUsersAsync]);

    return (
        <section>
            <div>
                <h2>All Users</h2>
                <ul>
                    {mapUsersToListIem()}
                </ul>
            </div>
            <div>
                <h2>Get User By ID</h2>
                <label htmlFor="getUserById">User ID</label>
                <input type="text" id="getUserById" onChange={getUserByIdHandlerAsync} />
                <p>{userById &&
                    `ID ${userById?.id};
                    Full Name: ${userById?.firstName} ${userById?.lastName};
                    Email: ${userById?.email};
                    Date Of Birth: ${userById?.dateOfBirth};
                    Address 1: ${userById?.address1};
                    Address 2: ${userById?.address2 ?? 'None'};
                    ZIP Code: ${userById?.zipCode};
                    State: ${userById?.state}.`}</p>
            </div>
            <div>
                <h2>Create User</h2>
                <form onSubmit={createFormSubmitHandlerAsync}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        onChange={createUserFirstNameHandlerAsync}
                        required
                     />

                    <label htmlFor="firstName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        onChange={createUserLastNameHandlerAsync}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        onChange={createUserEmailHandlerAsync}
                        required
                    />

                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        onChange={createUserDateOfBirthHandlerAsync}
                        required
                    />

                    <label htmlFor="address1">Address 1</label>
                    <input
                        type="text"
                        id="address1"
                        onChange={createUserAddress1HandlerAsync} 
                        required
                    />

                    <label htmlFor="address2">Address 2</label>
                    <input
                        type="text"
                        id="address2"
                        onChange={createUserAddress2HandlerAsync}
                        required
                    />

                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                        type="text"
                        id="zipCode"
                        onChange={createUserZipCodeHandlerAsync}
                        required
                    />

                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        onChange={createUserCountryStateHandlerAsync}
                        required
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default User;
