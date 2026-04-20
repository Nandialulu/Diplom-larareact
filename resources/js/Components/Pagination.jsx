import { Link } from "@inertiajs/react"
import {Pagination,PaginationContent,PaginationItem,PaginationLink,} from "@/components/ui/pagination"

export default function PaginationLinks({ links }) {
  return (
    <Pagination>
      <PaginationContent>
        {links.map((link, index) => (
          <PaginationItem key={index}>
            {link.url ? (
              <PaginationLink
                asChild
                isActive={link.active}
              >
                <Link href={link.url} preserveScroll>
                  {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                </Link>
              </PaginationLink>
            ) : (
              <span className="px-3 py-1 text-muted-foreground">
                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
              </span>
            )}
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  )
}