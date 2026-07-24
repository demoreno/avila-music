export default function YouTubeEmbed({ videoId, title = 'Video de YouTube' }: { videoId: string; title?: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-card not-prose">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}
