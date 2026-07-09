// import { Badge, Popover } from "antd";
// import CalendarDetailOverview from "./CalendarDetailOverview";

// const CalendarPopover = ({
//     isPopoverOpen,
//     setActivePopoverDate,
//     setSelectedDate,
//     setSelectedDayDetails,
//     listData,
//     selectedDayDetails,
//     selectedDate,
// }) => {
//     <Popover
//         trigger="click"
//         open={isPopoverOpen}
//         onOpenChange={(visible) => {
//             if (visible) {
//                 setActivePopoverDate;
//                 setSelectedDate;
//                 setSelectedDayDetails;
//             } else {
//                 setActivePopoverDate(null);
//             }
//         }}
//         content={
//             <CalendarDetailOverview
//                 details={selectedDayDetails}
//                 selectedDate={selectedDate}
//             />
//         }
//         placement="rightTop"
//         classNames={{ root: "calendar-popover" }}
//     >
//         <div>
//             <ul
//                 className="events"
//                 style={{ listStyle: "none", padding: 0, margin: 0 }}
//             >
//                 {listData.map(
//                     (item, index) =>
//                         item.content !== "0" && (
//                             <li key={index}>
//                                 <Badge
//                                     status={item.type}
//                                     text={
//                                         <span className="text-xs font-medium text-gray-600">
//                                             {item.title}: {item.content}
//                                         </span>
//                                     }
//                                 />
//                             </li>
//                         ),
//                 )}
//             </ul>
//         </div>
//     </Popover>;
// };

// export default CalendarPopover;
