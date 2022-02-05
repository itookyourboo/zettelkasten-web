import {useNavigate} from "solid-app-router";
import {ZettelService} from "../../services/ZettelService";
import {
    createEffect,
    createResource,
    createSignal,
    For,
    Show,
    Suspense,
    ErrorBoundary,
    batch,
    createRenderEffect, splitProps
} from "solid-js";
import {store} from "../../state/store";
import ZettelkastenSideBar from "../../components/ZettelkastenSideBar";
import Spinner from "../../components/Spinner";
import {OnItemClickProvider} from "../../state/OnItemClick";
import ZettelViewer from "../../components/ZettelViewer";
import {Tab} from "../../components/Tabs";

function MainPage(props) {
    const navigate = useNavigate();

    if (!store.profile.is_authenticated)
        navigate('/login', {replace: true})

    const [zettelkastenData] = createResource(ZettelService.loadKastenTree);
    const [selectedZettels, setSelectedZettels] = createSignal({});
    const [currentZettel, setCurrentZettel] = createSignal({});

    const onZettelClicked = (zettel) => {
        const [resource] = createResource(() =>
            ZettelService.loadZettel(zettel.kastenId, zettel.id));

        batch(() => {
            setCurrentZettel(zettel);
            setSelectedZettels(v => ({...v, [zettel.title]: resource}));
        })
    }

    return (
        <div style={{
            display: "flex",
            width: "100%",
            "align-items": "stretch"
        }}>

            <OnItemClickProvider onItemClick={onZettelClicked}>
                <ZettelkastenSideBar
                    data={zettelkastenData}
                    defaultActive={true}/>
            </OnItemClickProvider>

            <div>
                <div class="d-flex">
                    <For each={Object.keys(selectedZettels())}>
                        {
                            (title, index) => (
                                <Tab
                                    title={title}
                                    isActive={title === currentZettel()?.title}
                                    onClick={() => {
                                        console.log('click');
                                        setCurrentZettel(selectedZettels()[title])
                                    }}
                                    onClose={() => {
                                        console.log('close');
                                        batch(() => {
                                            const selected = selectedZettels();
                                            setSelectedZettels(v => {
                                                const [, rest] = splitProps(v, [title]);
                                                return rest;
                                            });
                                            if (currentZettel().title === title)
                                                setCurrentZettel(selected[Object.keys(selected)[0]]);
                                        })
                                    }}
                                />
                            )
                        }
                    </For>
                </div>

                <Show when={currentZettel()}>
                    <ZettelViewer
                        class="p-2"
                        zettel={currentZettel}/>
                </Show>
            </div>
        </div>
    );
}

export default MainPage;