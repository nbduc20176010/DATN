import React from "react";

import { Breadcrumb } from "antd";

type Props = {
    breads: any[];
};

const Custombreadcrumb = ({ breads }: Props) => {
    return (
        <Breadcrumb style={{ margin: "16px 0" }}>
            {breads.map((item: any) => (
                <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Custombreadcrumb;
