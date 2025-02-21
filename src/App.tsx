import PasswordGenerator from "./components/PasswordGenerator";
import { css } from "../styled-system/css";

const App = () => {
    return (
        <div
            className={css({
                minHeight: "screen",
                transitionProperty: "colors",
                transitionDuration: "200ms",
                borderRadius: "lg",
                border: "1px solid",
                bg: "card",
                color: "card-foreground",
                shadow: "sm"
            })}
        >
            <PasswordGenerator />
        </div>
    );
};

export default App;
