import { Key, Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  value: string;
}
type RefItemType = {
  name: string;
  key: string;
  href: string;
};

export const RefBreadcrumb: React.FC<Props> = ({ value }) => {
  const items: RefItemType[] = [
    {
      name: "Home",
      key: "home",
      href: "/ref/home",
    },
    {
      name: "Display",
      key: "display",
      href: "/ref/display",
    },
    {
      name: "Citation",
      key: "citation",
      href: "/ref/citation",
    },
  ];

  const handleItems = (items: RefItemType[]) => {
    const buffer = [];
    const itemIndex = items.findIndex((item) => {
      if (item.key === value) {
        return item;
      }
    });
    for (let i = 0; i <= itemIndex; i++) {
      if (i == itemIndex)
        buffer.push(
          <BreadcrumbItem key={items[i].key}>
            <BreadcrumbPage>{items[i].name}</BreadcrumbPage>
          </BreadcrumbItem>
        );
      else {
        buffer.push(
          <BreadcrumbItem key={items[i].key}>
            <BreadcrumbLink href={items[i].href}>
              {items[i].name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      }
      if (i !== itemIndex) {
        buffer.push(
          <BreadcrumbSeparator key={`${items[i].key} separator`}>
            <Slash />
          </BreadcrumbSeparator>
        );
      }
    }
    return buffer;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{handleItems(items)}</BreadcrumbList>
    </Breadcrumb>
  );
};
