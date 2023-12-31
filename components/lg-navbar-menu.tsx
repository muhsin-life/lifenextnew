import { useLanguage } from "@/hooks/useLanguage";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import getProductsDataByCat from "@/lib/getProductsDataByCat";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { animate, motion, motionValue } from "framer-motion";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
import { BrandsSkeleton } from "./skeletons";
import { buttonVariants } from "./ui/button";

import dynamic from "next/dynamic";

const ShopByCatContent = dynamic(() => import("./shop-by-category"), {
  ssr: false,
});
const LgNavbarCategoriesSection = ({
  setOverlay,
  data,
  brands_data,
}: {
  setOverlay: any;
  data: any;
  brands_data: any;
}) => {
  const { t } = useLanguage();

  const [groupHoverState, setGroupHover] = useState(false);

  return (
    <div className="bg-white md:block hidden  shadow ">
      <NavigationMenu.Root className="max-w-[1450px] mx-auto relative flex justify-between">
        <NavigationMenu.List className="center m-0 list-none grid grid-cols-12 items-center ">
          <NavigationMenu.Item
            onMouseOver={() => {
              setOverlay(true);
              setGroupHover(true);
            }}
            onMouseLeave={() => {
              setOverlay(false);
              setGroupHover(false);
            }}
            className="inline-block xl:col-span-2 col-span-3 min-w-fit"
          >
            <NavigationMenu.Trigger
              className={`${
                groupHoverState ? "bg-primary text-white " : ""
              }  py-[5px] flex justify-between px-2 border-r border-slate-300  items-center w-full bg-blue-50 `}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
            >
              <div className=" flex my-2 items-center justify-center p-0.5 ">
                <Icon
                  type="hamburgerMenuIcon"
                  className={`${groupHoverState ? "hidden" : "block"}`}
                />
                <Icon
                  type="crossIcon"
                  className={`${groupHoverState ? "block" : "hidden"}`}
                />
              </div>

              <Typography size={"sm"}>{t.navbar.shop_by_cat}</Typography>

              <Icon
                type="chevronBottomIcon"
                sizes={"sm"}
                className={`mr-2  transition-transform duration-200 ${
                  groupHoverState ? " rotate-180" : ""
                } `}
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content
              onMouseOver={() => {
                setOverlay(true);
                setGroupHover(true);
              }}
              onMouseLeave={() => {
                setGroupHover(false);
                setOverlay(false);
              }}
              className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0  right-0"
            >
              <ShopByCatContent data={data} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item className="w-full xl:col-span-1 col-span-2">
            <NavigationMenu.Trigger
              onMouseOver={() => setOverlay(true)}
              onMouseLeave={() => setOverlay(false)}
              className="w-full group flex  select-none items-center justify-center rounded-[4px] px-3  text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
            >
              <Link
                href={"/brands"}
                className="flex items-center underline-tra hover:text-blue-500 "
              >
                <Icon type="brandsIcon" className="my-2" />
                <Typography type="h6" className="ml-3">
                  Brands
                </Typography>
              </Link>
            </NavigationMenu.Trigger>

            <NavigationMenu.Content
              onMouseOver={() => setOverlay(true)}
              onMouseLeave={() => setOverlay(false)}
              className="absolute top-0 left-0 right-0 w-full sm:w-auto"
            >
              <ul className="">
                <li key={"brands-section"}>
                  <div
                    className="grid grid-cols-5 gap-3  mx-auto"
                    id="brands-section"
                  >
                    {brands_data.data.brands.map((bd: any) => (
                      <Link href={`/brand/${bd.slug}`} className="group/brand">
                        <Image
                          className="mx-auto rounded-full border border-white bg-white shadow-md group-hover/brand:shadow-lg"
                          width={120}
                          height={120}
                          src={bd.images.logo}
                          alt=""
                        />
                        <Typography
                          type="h5"
                          className="mt-3"
                          alignment={"horizontalCenter"}
                        >
                          {bd.name}
                        </Typography>
                      </Link>
                    ))}
                  </div>
                  <div className="w-full text-center my-5">
                    <Link
                      href="/brands"
                      className={buttonVariants({
                        variant: "default",
                        rounded: "full",
                      })}
                    >
                      VIEW ALL
                    </Link>
                  </div>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="w-full xl:col-span-1 col-span-2">
            <NavigationMenu.Link
              href={"/offers"}
              className="w-full group flex underline-tra hover:text-blue-500  select-none items-center justify-center rounded-[4px] px-3  font-medium leading-none "
            >
              <Icon type="offersIcon" className="my-2" />

              <Typography type="h6" className="ml-3">
                Offers
              </Typography>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="w-full xl:col-span-1 col-span-2">
            <NavigationMenu.Link
              href="/health_checkup"
              className="w-full group flex  underline-tra hover:text-blue-500 items-center justify-center rounded-[4px] px-3  font-medium leading-none"
            >
              <Image
                src={"https://www.lifepharmacy.com/images/appointments.svg"}
                className="w-5 h-5 my-3"
                width={24}
                height={24}
                alt="appointments"
              />
              <Typography type="h6" className="ml-3">
                Packages
              </Typography>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
            <div className="relative top-[100%] h-[17px] w-[17px] rotate-[45deg] rounded-tl-[2px] bg-white" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
        <div className=" absolute top-full left-0 right-0 flex w-full justify-center">
          <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full mx-auto origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 " />
        </div>
      </NavigationMenu.Root>
    </div>
  );
};

export default LgNavbarCategoriesSection;
