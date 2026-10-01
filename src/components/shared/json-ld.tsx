/**
 * Renders JSON-LD structured data. `<` is escaped so values containing `</script>` cannot break
 * out of the script element (JSON.stringify alone does not prevent this).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
