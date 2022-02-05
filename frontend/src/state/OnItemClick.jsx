import {createContext, useContext} from "solid-js";

const OnItemClickContext = createContext();

export const OnItemClickProvider = (props) => {
    return (
        <OnItemClickContext.Provider value={props.onItemClick}>
            {props.children}
        </OnItemClickContext.Provider>
    )
}

export const useOnItemClick = () => useContext(OnItemClickContext);
