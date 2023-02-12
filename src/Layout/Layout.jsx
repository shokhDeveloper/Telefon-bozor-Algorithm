import { Layout as AntdLayout } from "antd"
export const Layout = ({children}) => {
    return(
        <AntdLayout>
            {children}
        </AntdLayout>
    )
}