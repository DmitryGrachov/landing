export default function Quote({ text }: { text: string }) {
  return (
    <section className="bg-white px-6 py-11 text-center min-[480px]:py-16">
      <div className="mx-auto h-px w-[140px] bg-black" />
      <p className="mx-auto my-11 max-w-[960px] text-[26px] font-normal leading-[1.35] text-black min-[480px]:my-[54px] min-[480px]:text-[38px]">
        {text}
      </p>
      <div className="mx-auto h-px w-[140px] bg-black" />
    </section>
  );
}
