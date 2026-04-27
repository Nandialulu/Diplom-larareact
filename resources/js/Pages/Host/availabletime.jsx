import { useMemo } from "react";
import {format,differenceInCalendarDays,eachDayOfInterval,isSameDay,} from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/Components/ui/button";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { router } from "@inertiajs/react";

export default function AvailableTime({listing, date, setDate,bookedDates = [], pricePerDay = 0, options, setOptions,}) {
  // ene yu hiij baigag todorhoiloh
  const disabledDays = useMemo(() => {
    return bookedDates.map((d) => {
      const [year, month, day] = d.split("-").map(Number);
      return new Date(year, month - 1, day);
    });
  }, [bookedDates]);
  //Bookedudriig tootsooloh
  const isDateBooked = (day) => {
    return disabledDays.some((bookedDay) => isSameDay(bookedDay, day));
  };

  const hasDates = date?.from && date?.to;
// neg shuniin une
  const nights = hasDates
    ? Math.max(differenceInCalendarDays(date.to, date.from), 1)
    : 0;
// niit une oruulah
  const totalPrice = nights * Number(pricePerDay || 0);
// eniig asuuh
  const invalidRange = () => {
    if (!hasDates) return false;

    const endDate = new Date(date.to);
    endDate.setDate(endDate.getDate() - 1);

    if (date.from > endDate) return false;

    const days = eachDayOfInterval({
      start: date.from,
      end: endDate,
    });

    return days.some((day) => isDateBooked(day));
  };

  const isInvalid = invalidRange();

  const handleOption = (name, type) => {
    setOptions((prev) => {
      const minValue = name === "adult" || name === "room" ? 1 : 0;
      const newValue = type === "i" ? prev[name] + 1 : prev[name] - 1;

      return {
        ...prev,
        [name]: newValue < minValue ? minValue : newValue,
      };
    });
  };

  const isFormComplete =
    hasDates &&
    !isInvalid &&
    options?.adult >= 1 &&
    options?.room >= 1;

  const handleReserve = () => {
    if (!isFormComplete) return;

    router.get(route("booking.card", listing.id), {
      from: format(date.from, "yyyy-MM-dd"),
      to: format(date.to, "yyyy-MM-dd"),
      adult: options.adult,
      children: options.children,
      room: options.room,
    });
  };
  console.log("bookedDates prop", bookedDates);
  console.log("disabledDays", disabledDays);

  return (
    <div className="sticky top-6 rounded-3xl border bg-white p-6 shadow-lg space-y-4">
      <h2 className="text-xl font-medium">
        {!hasDates ? "Байрших өдрийн мэдээлэл оруулах" : `${pricePerDay}₮ / шөнө`}
      </h2>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full overflow-hidden rounded-2xl border text-left"
          >
            <div className="grid grid-cols-2">
              <div className="border-r p-3">
                <p className="text-[10px] font-bold uppercase">Ирэх</p>
                <p className="text-sm text-gray-500">
                  {date?.from ? format(date.from, "yyyy-MM-dd") : "Add date"}
                </p>
              </div>

              <div className="p-3">
                <p className="text-[10px] font-bold uppercase">Гарах</p>
                <p className="text-sm text-gray-500">
                  {date?.to ? format(date.to, "yyyy-MM-dd") : "Add date"}
                </p>
              </div>
            </div>

            <div className="border-t p-3">
              <div className="space-y-4">
                {["adult", "children", "room"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between"
                  >
                    <span className="capitalize">
                      {item === "adult"
                        ? "Том хүн"
                        : item === "children"
                        ? "Хүүхэд"
                        : "Өрөө"}
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={
                          options[item] <=
                          (item === "adult" || item === "room" ? 1 : 0)
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOption(item, "d");
                        }}
                      >
                        −
                      </Button>

                      <span className="w-6 text-center">{options[item]}</span>

                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOption(item, "i");
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </button>
        </PopoverTrigger>

  <PopoverContent className="w-auto p-0">
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        disabled={(day) =>
          day < new Date(new Date().setHours(0, 0, 0, 0)) || isDateBooked(day)
        }
        modifiers={{
          booked: (day) => isDateBooked(day),
        }}
        modifiersClassNames={{
          booked: "line-through text-red-500 opacity-70",
        }}
      />
    </PopoverContent>
      </Popover>

      {isInvalid && (
        <p className="text-sm font-medium text-red-500">
          Сонгосон хугацаанд захиалгатай өдөр байна.
        </p>
      )}

      {hasDates && !isInvalid && (
        <div className="space-y-2 border-t pt-3 text-sm">
          <div className="flex justify-between">
            <span>
              {pricePerDay}₮ × {nights} шөнө
            </span>
            <span>{totalPrice}₮</span>
          </div>

          <div className="flex justify-between">
            <span>Том хүн</span>
            <span>{options.adult}</span>
          </div>

          <div className="flex justify-between">
            <span>Хүүхэд</span>
            <span>{options.children}</span>
          </div>

          <div className="flex justify-between">
            <span>Өрөө</span>
            <span>{options.room}</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Нийт</span>
            <span>{totalPrice}₮</span>
          </div>
        </div>
      )}

      <Button
        type="button"
        className="w-full rounded-full h-14"
        disabled={!isFormComplete}
        onClick={handleReserve}
      >
        Захиалга хийх
      </Button>
    </div>
  );
}