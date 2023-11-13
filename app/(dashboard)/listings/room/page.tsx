import RoomRequiredForm from "@/components/custom/room-required-form";

export default function RoomRequiredListing() {
  return (
    <div className="min-h-screen bg-secondary text-muted-foreground ml-[-10px] ">
      {/* Your content goes here */}
      <div>Need Room</div>
      <RoomRequiredForm />
    </div>
  );
}
