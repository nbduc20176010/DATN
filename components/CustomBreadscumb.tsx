"use client";

import { Breadcrumb } from "antd";

export default function CustomBreadscumb({ breads }: any) {
    return (
        <Breadcrumb style={{ margin: "16px 0" }}>
            {breads.map((item: any) => (
                <Breadcrumb.Item>{item}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}
