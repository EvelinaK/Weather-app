import React from "react";
import WeatherItem from "./WeatherItem.jsx";

const setUp = (props) => shallow( < WeatherItem {...props }
        />);

        describe("should render Post component", () => {
            let component;
            beforeEach(() => {
                component = setUp();
            });

            it("should contain .post wrapper", () => {
                const wrapper = component.find("Card");
                expect(wrapper.length).toBe(1);
            });

            it("should contain link", () => {
                const wrapper = component.find(".weather-link");
                expect(wrapper.length).toBe(1);
            });

            // it("should render created date", () => {
            //     const created_at = "01-03-2020";
            //     component = setUp({ created_at });
            //     const date = component.find(".date");
            //     expect(date.text()).toBe(new Date(created_at).toLocaleDateString());
            // });
        });