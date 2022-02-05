import {createSignal, For} from "solid-js";
import {CloseButton} from "solid-bootstrap";

const Tabs = (props) => {
    const [currentTab, setCurrentTab] = createSignal();

    return (
        <div>
            <div class="d-flex align-items-center">
                <For each={props.children}>
                    {child => {
                        return (
                            <Tab
                                title={child.props.title}
                                onClick={() => setCurrentTab(child.props.title)}
                                onClose={() => {
                                }}
                            />
                        )
                    }}
                </For>
            </div>
            <div>
                <For each={props.children}>
                    {child => {
                        if (child.props.title !== currentTab())
                            return undefined
                        return child.props.children;
                    }}
                </For>
            </div>
        </div>
    )
}

const Tab = (props) => {
    return (
        <div role="button"
             class="d-flex p-2 align-items-center user-select-none"
             className={`${props.isActive? "bg-light": ""}`}
             onClick={props.onClick}>
            <span class="me-1">{props.title}</span>
            <CloseButton onClick={props.onClose}/>
        </div>
    )
}

export {Tabs, Tab};

