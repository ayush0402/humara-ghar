import RoomRequiredForm from "@/components/custom/room-required-form";

export default function RoomRequiredListing() {
  return (
    <div className="h-full ml-[10px] bg-secondary text-muted-foreground ">
      {/* Your content goes here */}
      <div>Need Room</div>
      <RoomRequiredForm />
    </div>
  );
}
